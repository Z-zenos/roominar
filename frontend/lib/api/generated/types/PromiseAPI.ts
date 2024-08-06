import { HttpInfo } from '../http/http';
import { Configuration } from '../configuration';

import { ObservableDefaultApi } from './ObservableAPI';

import {
	DefaultApiRequestFactory,
	DefaultApiResponseProcessor,
} from '../apis/DefaultApi';
export class PromiseDefaultApi {
	private api: ObservableDefaultApi;

	public constructor(
		configuration: Configuration,
		requestFactory?: DefaultApiRequestFactory,
		responseProcessor?: DefaultApiResponseProcessor,
	) {
		this.api = new ObservableDefaultApi(
			configuration,
			requestFactory,
			responseProcessor,
		);
	}

	/**
	 * Healthcheck
	 */
	public healthcheckHealthcheckGetWithHttpInfo(
		_options?: Configuration,
	): Promise<HttpInfo<void>> {
		const result = this.api.healthcheckHealthcheckGetWithHttpInfo(_options);

		return result.toPromise();
	}

	/**
	 * Healthcheck
	 */
	public healthcheckHealthcheckGet(_options?: Configuration): Promise<void> {
		const result = this.api.healthcheckHealthcheckGet(_options);

		return result.toPromise();
	}
}
