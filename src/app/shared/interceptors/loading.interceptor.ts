import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "src/app/services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor( private loadingsvc: LoadingService) {}
    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingsvc.show();
        return next.handle(req).pipe(
            finalize(() => this.loadingsvc.hide()));        
    }
}