import * as constants from '../constants';

class UrlHelper {
    static getPlanVariantId(): string | null {
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.hash.replace('#/', ''));
        let param = params.get(constants.planVariantIdUrlParamName);

        return param;
    }
}

export default UrlHelper;