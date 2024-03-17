import { HttpClient, HttpHeaders } from "@angular/common/http"

export class MockAuthServiceStub {
    constructor(private http: HttpClient) {}

        login(data: {email: string, password: string}) {
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            return this.http.post('http://example.com/post', data, { headers });
}

}
