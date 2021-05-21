import { JsonRequest } from 'http-req-builder'
import { ResponseValidator } from 'response-openapi-validator'

//import type { Options, Method } from 'got'
//import got from 'got'

/*
export class JsonRequest {
    protected options: any = {
        responseType: 'json'
    }
    public url(url: string | URL): this {
        this.options.url = url
        return this 
    }
    public method(method: Method){
        this.options.method = method
        return this
    }
    public searchParams(searchParams: Options['searchParams']): this {
        this.options.searchParams
        return this
    }
    public body(body: any): this {
        this.options.json = body
        return this
    }
    public send() {
        return got<any>(this.options)
    }

}
*/
const responseValidator = new ResponseValidator({
    openApiSpecPath: 'http://93.126.97.71:10080/api/swagger.json',
    apiPathPrefix: '/api',
    ajvOptions: {
        allErrors: true,
        verbose: true,
        formats: {
            double: "[+-]?\\d*\\.?\\d+",
            int32: /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
            int64: /^\d+$/,
        }, 
    } 
})
export class JsonRequestWithValidation extends JsonRequest {
    async send<T = any> () {
        const response = await super.send<T>();
        // Example is simplyfied: in case 4xx/5xx statuses validation won't be applied
        await responseValidator.assertResponse({
           method: response.request.options.method,
           requestUrl: response.request.requestUrl,
           statusCode: response.statusCode,
           body: response.body 
        })
        return response
    }
}
