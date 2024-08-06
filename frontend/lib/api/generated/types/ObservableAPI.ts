import { ResponseContext, RequestContext, HttpInfo } from '../http/http';
import { Configuration } from '../configuration';
import { Observable, of, from } from '../rxjsStub';
import { mergeMap, map } from '../rxjsStub';

import {
	DefaultApiRequestFactory,
	DefaultApiResponseProcessor,
} from '../apis/DefaultApi';
export class ObservableDefaultApi {
	private requestFactory: DefaultApiRequestFactory;
	private responseProcessor: DefaultApiResponseProcessor;
	private configuration: Configuration;

	public constructor(
		configuration: Configuration,
		requestFactory?: DefaultApiRequestFactory,
		responseProcessor?: DefaultApiResponseProcessor,
	) {
		this.configuration = configuration;
		this.requestFactory =
			requestFactory || new DefaultApiRequestFactory(configuration);
		this.responseProcessor =
			responseProcessor || new DefaultApiResponseProcessor();
	}

	/**
	 * Healthcheck
	 */
	public healthcheckHealthcheckGetWithHttpInfo(
		_options?: Configuration,
	): Observable<HttpInfo<void>> {
		const requestContextPromise =
			this.requestFactory.healthcheckHealthcheckGet(_options);

		// build promise chain
		let middlewarePreObservable = from<RequestContext>(requestContextPromise);

		for (let middleware of this.configuration.middleware) {
			middlewarePreObservable = middlewarePreObservable.pipe(
				mergeMap((ctx: RequestContext) => middleware.pre(ctx)),
			);
		}

		return middlewarePreObservable
			.pipe(
				mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx)),
			)
			.pipe(
				mergeMap((response: ResponseContext) => {
					let middlewarePostObservable = of(response);

					for (let middleware of this.configuration.middleware) {
						middlewarePostObservable = middlewarePostObservable.pipe(
							mergeMap((rsp: ResponseContext) => middleware.post(rsp)),
						);
					}

					return middlewarePostObservable.pipe(
						map((rsp: ResponseContext) =>
							this.responseProcessor.healthcheckHealthcheckGetWithHttpInfo(rsp),
						),
					);
				}),
			);
	}

	/**
	 * Healthcheck
	 */
	public healthcheckHealthcheckGet(_options?: Configuration): Observable<void> {
		return this.healthcheckHealthcheckGetWithHttpInfo(_options).pipe(
			map((apiResponse: HttpInfo<void>) => apiResponse.data),
		);
	}
}
