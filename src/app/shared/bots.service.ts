import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotsService {
  private statusUrl = '/api/status';
  private botsUrl = '/api/bots';

  constructor(private http: HttpClient) { }

  // Get the status
  getStatus(): Promise<void | any> {
    return this.http.get(this.statusUrl)
               .toPromise()
               .then(response => response)
               .catch(this.error);
  }

  //Making a call to the server's bot exposed endpoint
  async runBots(bot_codes: string[]): Promise<void | any> {
    //console.log(bot_codes);
    try {
      const response = await this.http.post(this.botsUrl, bot_codes)
        .toPromise();
      return response;
    } catch (error) {
      return this.error(error);
    }
  }

  // Error handling
  private error (error: any) {
    let message = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }

}
