import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credencias.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {
    }

    authenticate(creds : CredenciaisDTO) : Observable<any>{
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        creds,
        {
            observe: 'response',
            responseType: 'text',
        });
    }
}