import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class MovieService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         
    }
  
    getmovies() {
        var url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=e649c1ec4f43c9f8ea307ec5aec0e891';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
}