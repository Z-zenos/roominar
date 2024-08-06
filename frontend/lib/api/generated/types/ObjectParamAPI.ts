import { HttpInfo } from '../http/http';
import { Configuration } from '../configuration';

import { ObservableDefaultApi } from './ObservableAPI';
import {
	DefaultApiRequestFactory,
	DefaultApiResponseProcessor,
} from '../apis/DefaultApi';

export interface DefaultApiHealthcheckHealthcheckGetRequest {}

export class ObjectDefaultApi {
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
	 * @param param the request object
	 */
	public healthcheckHealthcheckGetWithHttpInfo(
		param: DefaultApiHealthcheckHealthcheckGetRequest = {},
		options?: Configuration,
	): Promise<HttpInfo<void>> {
		return this.api.healthcheckHealthcheckGetWithHttpInfo(options).toPromise();
	}

	/**
	 * Healthcheck
	 * @param param the request object
	 */
	public healthcheckHealthcheckGet(
		param: DefaultApiHealthcheckHealthcheckGetRequest = {},
		options?: Configuration,
	): Promise<void> {
		return this.api.healthcheckHealthcheckGet(options).toPromise();
	}
}
