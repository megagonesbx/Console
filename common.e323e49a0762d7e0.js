"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[592],{4557:(v,i,s)=>{s.d(i,{K:()=>p});var _=s(2340),l=s(7579),u=s(1135),a=s(4004),o=s(262),n=s(9646),h=s(5e3),d=s(520);const g=_.N.base_url;let p=(()=>{class r{constructor(e){this._http=e,this.fooSubject=new l.x,this._users=new u.X(null),this._neighbors=new u.X(null),this.path=`${g}/user`}get users$(){return this._users.asObservable()}get neighbors$(){return this._neighbors.asObservable()}getUsers(e){return this._http.post(`${this.path}/users`,e,this.getHeaders).pipe((0,a.U)(t=>t.statusCode&&200==t.statusCode?(this._users.next(t.data),{users:t.data,total:t.count,page:t.page,pages:t.pages}):null),(0,o.K)(t=>(0,n.of)(null)))}createUser(e){return this._http.post(`${this.path}/create`,e,this.getHeaders).pipe((0,a.U)(t=>t.statusCode?t.statusCode:500),(0,o.K)(t=>(0,n.of)(t.status)))}updateUser(e){return this._http.put(`${this.path}/update`,e,this.getHeaders).pipe((0,a.U)(t=>t?t.statusCode:500),(0,o.K)(t=>(0,n.of)(t.status)))}deleteUser(e){return this._http.delete(`${this.path}/${e}`,this.getHeaders).pipe((0,a.U)(t=>t?t.statusCode:500),(0,o.K)(t=>(0,n.of)(t.status)))}getNeighbors(){return this._http.get(`${this.path}/neighbors`,this.getHeaders).pipe((0,a.U)(e=>(this._neighbors.next(null==e?void 0:e.data),null==e?void 0:e.data)),(0,o.K)(e=>(0,n.of)(null)))}get getToken(){return localStorage.getItem("x-token")||""}get getHeaders(){return{headers:{"x-token":this.getToken}}}foo(){this.fooSubject.next()}get onFoo(){return this.fooSubject.asObservable()}}return r.\u0275fac=function(e){return new(e||r)(h.LFG(d.eN))},r.\u0275prov=h.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()}}]);