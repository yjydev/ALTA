"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6965],{56965:function(e,n,t){t.r(n),t.d(n,{CompletionAdapter:function(){return vn},DefinitionAdapter:function(){return An},DiagnosticsAdapter:function(){return ln},DocumentColorAdapter:function(){return Zn},DocumentFormattingEditProvider:function(){return Mn},DocumentHighlightAdapter:function(){return Cn},DocumentLinkAdapter:function(){return Pn},DocumentRangeFormattingEditProvider:function(){return Ln},DocumentSymbolAdapter:function(){return Tn},FoldingRangeAdapter:function(){return jn},HoverAdapter:function(){return yn},ReferenceAdapter:function(){return Sn},RenameAdapter:function(){return Rn},SelectionRangeAdapter:function(){return On},WorkerManager:function(){return de},fromPosition:function(){return pn},fromRange:function(){return mn},setupMode:function(){return Wn},setupMode1:function(){return Un},toRange:function(){return _n},toTextEdit:function(){return kn}});var r=t(60136),i=t(27277),o=t(15671),a=t(43144),s=t(4942),u=t(37762),c=t(41875),d=Object.defineProperty,g=Object.getOwnPropertyDescriptor,f=Object.getOwnPropertyNames,l=Object.prototype.hasOwnProperty,h={};!function(e,n,t,r){if(n&&"object"===typeof n||"function"===typeof n){var i,o=(0,u.Z)(f(n));try{var a=function(){var o=i.value;l.call(e,o)||!t&&"default"===o||d(e,o,{get:function(){return n[o]},enumerable:!(r=g(n,o))||r.enumerable})};for(o.s();!(i=o.n()).done;)a()}catch(s){o.e(s)}finally{o.f()}}}(h,c);var v,p,m,_,w,k,y,b,E,C,x,A,I,S,R,T,D,P,M,L,F,Z,j,O,N,U,W,V,H,K,z,X,B,$,q,Q,G,J,Y,ee,ne,te,re,ie,oe,ae,se,ue,ce,de=function(){function e(n){var t=this;(0,o.Z)(this,e),(0,s.Z)(this,"_defaults",void 0),(0,s.Z)(this,"_idleCheckInterval",void 0),(0,s.Z)(this,"_lastUsedTime",void 0),(0,s.Z)(this,"_configChangeListener",void 0),(0,s.Z)(this,"_worker",void 0),(0,s.Z)(this,"_client",void 0),this._defaults=n,this._worker=null,this._client=null,this._idleCheckInterval=window.setInterval((function(){return t._checkIfIdle()}),3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange((function(){return t._stopWorker()}))}return(0,a.Z)(e,[{key:"_stopWorker",value:function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}},{key:"dispose",value:function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()}},{key:"_checkIfIdle",value:function(){this._worker&&(Date.now()-this._lastUsedTime>12e4&&this._stopWorker())}},{key:"_getClient",value:function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=h.editor.createWebWorker({moduleId:"vs/language/html/htmlWorker",createData:{languageSettings:this._defaults.options,languageId:this._defaults.languageId},label:this._defaults.languageId}),this._client=this._worker.getProxy()),this._client}},{key:"getLanguageServiceWorker",value:function(){for(var e,n=this,t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i];return this._getClient().then((function(n){e=n})).then((function(e){if(n._worker)return n._worker.withSyncedResources(r)})).then((function(n){return e}))}}]),e}();(p=v||(v={})).MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647,(_=m||(m={})).MIN_VALUE=0,_.MAX_VALUE=2147483647,(k=w||(w={})).create=function(e,n){return e===Number.MAX_VALUE&&(e=m.MAX_VALUE),n===Number.MAX_VALUE&&(n=m.MAX_VALUE),{line:e,character:n}},k.is=function(e){var n=e;return gn.objectLiteral(n)&&gn.uinteger(n.line)&&gn.uinteger(n.character)},(b=y||(y={})).create=function(e,n,t,r){if(gn.uinteger(e)&&gn.uinteger(n)&&gn.uinteger(t)&&gn.uinteger(r))return{start:w.create(e,n),end:w.create(t,r)};if(w.is(e)&&w.is(n))return{start:e,end:n};throw new Error("Range#create called with invalid arguments["+e+", "+n+", "+t+", "+r+"]")},b.is=function(e){var n=e;return gn.objectLiteral(n)&&w.is(n.start)&&w.is(n.end)},(C=E||(E={})).create=function(e,n){return{uri:e,range:n}},C.is=function(e){var n=e;return gn.defined(n)&&y.is(n.range)&&(gn.string(n.uri)||gn.undefined(n.uri))},(A=x||(x={})).create=function(e,n,t,r){return{targetUri:e,targetRange:n,targetSelectionRange:t,originSelectionRange:r}},A.is=function(e){var n=e;return gn.defined(n)&&y.is(n.targetRange)&&gn.string(n.targetUri)&&(y.is(n.targetSelectionRange)||gn.undefined(n.targetSelectionRange))&&(y.is(n.originSelectionRange)||gn.undefined(n.originSelectionRange))},(S=I||(I={})).create=function(e,n,t,r){return{red:e,green:n,blue:t,alpha:r}},S.is=function(e){var n=e;return gn.numberRange(n.red,0,1)&&gn.numberRange(n.green,0,1)&&gn.numberRange(n.blue,0,1)&&gn.numberRange(n.alpha,0,1)},(T=R||(R={})).create=function(e,n){return{range:e,color:n}},T.is=function(e){var n=e;return y.is(n.range)&&I.is(n.color)},(P=D||(D={})).create=function(e,n,t){return{label:e,textEdit:n,additionalTextEdits:t}},P.is=function(e){var n=e;return gn.string(n.label)&&(gn.undefined(n.textEdit)||$.is(n))&&(gn.undefined(n.additionalTextEdits)||gn.typedArray(n.additionalTextEdits,$.is))},(L=M||(M={})).Comment="comment",L.Imports="imports",L.Region="region",(Z=F||(F={})).create=function(e,n,t,r,i){var o={startLine:e,endLine:n};return gn.defined(t)&&(o.startCharacter=t),gn.defined(r)&&(o.endCharacter=r),gn.defined(i)&&(o.kind=i),o},Z.is=function(e){var n=e;return gn.uinteger(n.startLine)&&gn.uinteger(n.startLine)&&(gn.undefined(n.startCharacter)||gn.uinteger(n.startCharacter))&&(gn.undefined(n.endCharacter)||gn.uinteger(n.endCharacter))&&(gn.undefined(n.kind)||gn.string(n.kind))},(O=j||(j={})).create=function(e,n){return{location:e,message:n}},O.is=function(e){var n=e;return gn.defined(n)&&E.is(n.location)&&gn.string(n.message)},(U=N||(N={})).Error=1,U.Warning=2,U.Information=3,U.Hint=4,(V=W||(W={})).Unnecessary=1,V.Deprecated=2,(H||(H={})).is=function(e){var n=e;return void 0!==n&&null!==n&&gn.string(n.href)},(z=K||(K={})).create=function(e,n,t,r,i,o){var a={range:e,message:n};return gn.defined(t)&&(a.severity=t),gn.defined(r)&&(a.code=r),gn.defined(i)&&(a.source=i),gn.defined(o)&&(a.relatedInformation=o),a},z.is=function(e){var n,t=e;return gn.defined(t)&&y.is(t.range)&&gn.string(t.message)&&(gn.number(t.severity)||gn.undefined(t.severity))&&(gn.integer(t.code)||gn.string(t.code)||gn.undefined(t.code))&&(gn.undefined(t.codeDescription)||gn.string(null===(n=t.codeDescription)||void 0===n?void 0:n.href))&&(gn.string(t.source)||gn.undefined(t.source))&&(gn.undefined(t.relatedInformation)||gn.typedArray(t.relatedInformation,j.is))},(B=X||(X={})).create=function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var i={title:e,command:n};return gn.defined(t)&&t.length>0&&(i.arguments=t),i},B.is=function(e){var n=e;return gn.defined(n)&&gn.string(n.title)&&gn.string(n.command)},(q=$||($={})).replace=function(e,n){return{range:e,newText:n}},q.insert=function(e,n){return{range:{start:e,end:e},newText:n}},q.del=function(e){return{range:e,newText:""}},q.is=function(e){var n=e;return gn.objectLiteral(n)&&gn.string(n.newText)&&y.is(n.range)},(G=Q||(Q={})).create=function(e,n,t){var r={label:e};return void 0!==n&&(r.needsConfirmation=n),void 0!==t&&(r.description=t),r},G.is=function(e){var n=e;return void 0!==n&&gn.objectLiteral(n)&&gn.string(n.label)&&(gn.boolean(n.needsConfirmation)||void 0===n.needsConfirmation)&&(gn.string(n.description)||void 0===n.description)},(J||(J={})).is=function(e){return"string"===typeof e},(ee=Y||(Y={})).replace=function(e,n,t){return{range:e,newText:n,annotationId:t}},ee.insert=function(e,n,t){return{range:{start:e,end:e},newText:n,annotationId:t}},ee.del=function(e,n){return{range:e,newText:"",annotationId:n}},ee.is=function(e){var n=e;return $.is(n)&&(Q.is(n.annotationId)||J.is(n.annotationId))},(te=ne||(ne={})).create=function(e,n){return{textDocument:e,edits:n}},te.is=function(e){var n=e;return gn.defined(n)&&ve.is(n.textDocument)&&Array.isArray(n.edits)},(ie=re||(re={})).create=function(e,n,t){var r={kind:"create",uri:e};return void 0===n||void 0===n.overwrite&&void 0===n.ignoreIfExists||(r.options=n),void 0!==t&&(r.annotationId=t),r},ie.is=function(e){var n=e;return n&&"create"===n.kind&&gn.string(n.uri)&&(void 0===n.options||(void 0===n.options.overwrite||gn.boolean(n.options.overwrite))&&(void 0===n.options.ignoreIfExists||gn.boolean(n.options.ignoreIfExists)))&&(void 0===n.annotationId||J.is(n.annotationId))},(ae=oe||(oe={})).create=function(e,n,t,r){var i={kind:"rename",oldUri:e,newUri:n};return void 0===t||void 0===t.overwrite&&void 0===t.ignoreIfExists||(i.options=t),void 0!==r&&(i.annotationId=r),i},ae.is=function(e){var n=e;return n&&"rename"===n.kind&&gn.string(n.oldUri)&&gn.string(n.newUri)&&(void 0===n.options||(void 0===n.options.overwrite||gn.boolean(n.options.overwrite))&&(void 0===n.options.ignoreIfExists||gn.boolean(n.options.ignoreIfExists)))&&(void 0===n.annotationId||J.is(n.annotationId))},(ue=se||(se={})).create=function(e,n,t){var r={kind:"delete",uri:e};return void 0===n||void 0===n.recursive&&void 0===n.ignoreIfNotExists||(r.options=n),void 0!==t&&(r.annotationId=t),r},ue.is=function(e){var n=e;return n&&"delete"===n.kind&&gn.string(n.uri)&&(void 0===n.options||(void 0===n.options.recursive||gn.boolean(n.options.recursive))&&(void 0===n.options.ignoreIfNotExists||gn.boolean(n.options.ignoreIfNotExists)))&&(void 0===n.annotationId||J.is(n.annotationId))},(ce||(ce={})).is=function(e){var n=e;return n&&(void 0!==n.changes||void 0!==n.documentChanges)&&(void 0===n.documentChanges||n.documentChanges.every((function(e){return gn.string(e.kind)?re.is(e)||oe.is(e)||se.is(e):ne.is(e)})))};var ge,fe,le,he,ve,pe,me,_e,we,ke,ye,be,Ee,Ce,xe,Ae,Ie,Se,Re,Te,De,Pe,Me,Le,Fe,Ze,je,Oe,Ne,Ue,We,Ve,He,Ke,ze,Xe,Be,$e,qe,Qe,Ge,Je,Ye,en,nn,tn,rn,on,an,sn,un,cn=function(){function e(e,n){this.edits=e,this.changeAnnotations=n}return e.prototype.insert=function(e,n,t){var r,i;if(void 0===t?r=$.insert(e,n):J.is(t)?(i=t,r=Y.insert(e,n,t)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(t),r=Y.insert(e,n,i)),this.edits.push(r),void 0!==i)return i},e.prototype.replace=function(e,n,t){var r,i;if(void 0===t?r=$.replace(e,n):J.is(t)?(i=t,r=Y.replace(e,n,t)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(t),r=Y.replace(e,n,i)),this.edits.push(r),void 0!==i)return i},e.prototype.delete=function(e,n){var t,r;if(void 0===n?t=$.del(e):J.is(n)?(r=n,t=Y.del(e,n)):(this.assertChangeAnnotations(this.changeAnnotations),r=this.changeAnnotations.manage(n),t=Y.del(e,r)),this.edits.push(t),void 0!==r)return r},e.prototype.add=function(e){this.edits.push(e)},e.prototype.all=function(){return this.edits},e.prototype.clear=function(){this.edits.splice(0,this.edits.length)},e.prototype.assertChangeAnnotations=function(e){if(void 0===e)throw new Error("Text edit change is not configured to manage change annotations.")},e}(),dn=function(){function e(e){this._annotations=void 0===e?Object.create(null):e,this._counter=0,this._size=0}return e.prototype.all=function(){return this._annotations},Object.defineProperty(e.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),e.prototype.manage=function(e,n){var t;if(J.is(e)?t=e:(t=this.nextId(),n=e),void 0!==this._annotations[t])throw new Error("Id "+t+" is already in use.");if(void 0===n)throw new Error("No annotation provided for id "+t);return this._annotations[t]=n,this._size++,t},e.prototype.nextId=function(){return this._counter++,this._counter.toString()},e}();!function(){function e(e){var n=this;this._textEditChanges=Object.create(null),void 0!==e?(this._workspaceEdit=e,e.documentChanges?(this._changeAnnotations=new dn(e.changeAnnotations),e.changeAnnotations=this._changeAnnotations.all(),e.documentChanges.forEach((function(e){if(ne.is(e)){var t=new cn(e.edits,n._changeAnnotations);n._textEditChanges[e.textDocument.uri]=t}}))):e.changes&&Object.keys(e.changes).forEach((function(t){var r=new cn(e.changes[t]);n._textEditChanges[t]=r}))):this._workspaceEdit={}}Object.defineProperty(e.prototype,"edit",{get:function(){return this.initDocumentChanges(),void 0!==this._changeAnnotations&&(0===this._changeAnnotations.size?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),e.prototype.getTextEditChange=function(e){if(ve.is(e)){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var n={uri:e.uri,version:e.version};if(!(r=this._textEditChanges[n.uri])){var t={textDocument:n,edits:i=[]};this._workspaceEdit.documentChanges.push(t),r=new cn(i,this._changeAnnotations),this._textEditChanges[n.uri]=r}return r}if(this.initChanges(),void 0===this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var r;if(!(r=this._textEditChanges[e])){var i=[];this._workspaceEdit.changes[e]=i,r=new cn(i),this._textEditChanges[e]=r}return r},e.prototype.initDocumentChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._changeAnnotations=new dn,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},e.prototype.initChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._workspaceEdit.changes=Object.create(null))},e.prototype.createFile=function(e,n,t){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(Q.is(n)||J.is(n)?r=n:t=n,void 0===r?i=re.create(e,t):(o=J.is(r)?r:this._changeAnnotations.manage(r),i=re.create(e,t,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o},e.prototype.renameFile=function(e,n,t,r){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var i,o,a;if(Q.is(t)||J.is(t)?i=t:r=t,void 0===i?o=oe.create(e,n,r):(a=J.is(i)?i:this._changeAnnotations.manage(i),o=oe.create(e,n,r,a)),this._workspaceEdit.documentChanges.push(o),void 0!==a)return a},e.prototype.deleteFile=function(e,n,t){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(Q.is(n)||J.is(n)?r=n:t=n,void 0===r?i=se.create(e,t):(o=J.is(r)?r:this._changeAnnotations.manage(r),i=se.create(e,t,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o}}();(fe=ge||(ge={})).create=function(e){return{uri:e}},fe.is=function(e){var n=e;return gn.defined(n)&&gn.string(n.uri)},(he=le||(le={})).create=function(e,n){return{uri:e,version:n}},he.is=function(e){var n=e;return gn.defined(n)&&gn.string(n.uri)&&gn.integer(n.version)},(pe=ve||(ve={})).create=function(e,n){return{uri:e,version:n}},pe.is=function(e){var n=e;return gn.defined(n)&&gn.string(n.uri)&&(null===n.version||gn.integer(n.version))},(_e=me||(me={})).create=function(e,n,t,r){return{uri:e,languageId:n,version:t,text:r}},_e.is=function(e){var n=e;return gn.defined(n)&&gn.string(n.uri)&&gn.string(n.languageId)&&gn.integer(n.version)&&gn.string(n.text)},(ke=we||(we={})).PlainText="plaintext",ke.Markdown="markdown",function(e){e.is=function(n){var t=n;return t===e.PlainText||t===e.Markdown}}(we||(we={})),(ye||(ye={})).is=function(e){var n=e;return gn.objectLiteral(e)&&we.is(n.kind)&&gn.string(n.value)},(Ee=be||(be={})).Text=1,Ee.Method=2,Ee.Function=3,Ee.Constructor=4,Ee.Field=5,Ee.Variable=6,Ee.Class=7,Ee.Interface=8,Ee.Module=9,Ee.Property=10,Ee.Unit=11,Ee.Value=12,Ee.Enum=13,Ee.Keyword=14,Ee.Snippet=15,Ee.Color=16,Ee.File=17,Ee.Reference=18,Ee.Folder=19,Ee.EnumMember=20,Ee.Constant=21,Ee.Struct=22,Ee.Event=23,Ee.Operator=24,Ee.TypeParameter=25,(xe=Ce||(Ce={})).PlainText=1,xe.Snippet=2,(Ae||(Ae={})).Deprecated=1,(Se=Ie||(Ie={})).create=function(e,n,t){return{newText:e,insert:n,replace:t}},Se.is=function(e){var n=e;return n&&gn.string(n.newText)&&y.is(n.insert)&&y.is(n.replace)},(Te=Re||(Re={})).asIs=1,Te.adjustIndentation=2,(De||(De={})).create=function(e){return{label:e}},(Pe||(Pe={})).create=function(e,n){return{items:e||[],isIncomplete:!!n}},(Le=Me||(Me={})).fromPlainText=function(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")},Le.is=function(e){var n=e;return gn.string(n)||gn.objectLiteral(n)&&gn.string(n.language)&&gn.string(n.value)},(Fe||(Fe={})).is=function(e){var n=e;return!!n&&gn.objectLiteral(n)&&(ye.is(n.contents)||Me.is(n.contents)||gn.typedArray(n.contents,Me.is))&&(void 0===e.range||y.is(e.range))},(Ze||(Ze={})).create=function(e,n){return n?{label:e,documentation:n}:{label:e}},(je||(je={})).create=function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var i={label:e};return gn.defined(n)&&(i.documentation=n),gn.defined(t)?i.parameters=t:i.parameters=[],i},(Ne=Oe||(Oe={})).Text=1,Ne.Read=2,Ne.Write=3,(Ue||(Ue={})).create=function(e,n){var t={range:e};return gn.number(n)&&(t.kind=n),t},(Ve=We||(We={})).File=1,Ve.Module=2,Ve.Namespace=3,Ve.Package=4,Ve.Class=5,Ve.Method=6,Ve.Property=7,Ve.Field=8,Ve.Constructor=9,Ve.Enum=10,Ve.Interface=11,Ve.Function=12,Ve.Variable=13,Ve.Constant=14,Ve.String=15,Ve.Number=16,Ve.Boolean=17,Ve.Array=18,Ve.Object=19,Ve.Key=20,Ve.Null=21,Ve.EnumMember=22,Ve.Struct=23,Ve.Event=24,Ve.Operator=25,Ve.TypeParameter=26,(He||(He={})).Deprecated=1,(Ke||(Ke={})).create=function(e,n,t,r,i){var o={name:e,kind:n,location:{uri:r,range:t}};return i&&(o.containerName=i),o},(Xe=ze||(ze={})).create=function(e,n,t,r,i,o){var a={name:e,detail:n,kind:t,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a},Xe.is=function(e){var n=e;return n&&gn.string(n.name)&&gn.number(n.kind)&&y.is(n.range)&&y.is(n.selectionRange)&&(void 0===n.detail||gn.string(n.detail))&&(void 0===n.deprecated||gn.boolean(n.deprecated))&&(void 0===n.children||Array.isArray(n.children))&&(void 0===n.tags||Array.isArray(n.tags))},($e=Be||(Be={})).Empty="",$e.QuickFix="quickfix",$e.Refactor="refactor",$e.RefactorExtract="refactor.extract",$e.RefactorInline="refactor.inline",$e.RefactorRewrite="refactor.rewrite",$e.Source="source",$e.SourceOrganizeImports="source.organizeImports",$e.SourceFixAll="source.fixAll",(Qe=qe||(qe={})).create=function(e,n){var t={diagnostics:e};return void 0!==n&&null!==n&&(t.only=n),t},Qe.is=function(e){var n=e;return gn.defined(n)&&gn.typedArray(n.diagnostics,K.is)&&(void 0===n.only||gn.typedArray(n.only,gn.string))},(Je=Ge||(Ge={})).create=function(e,n,t){var r={title:e},i=!0;return"string"===typeof n?(i=!1,r.kind=n):X.is(n)?r.command=n:r.edit=n,i&&void 0!==t&&(r.kind=t),r},Je.is=function(e){var n=e;return n&&gn.string(n.title)&&(void 0===n.diagnostics||gn.typedArray(n.diagnostics,K.is))&&(void 0===n.kind||gn.string(n.kind))&&(void 0!==n.edit||void 0!==n.command)&&(void 0===n.command||X.is(n.command))&&(void 0===n.isPreferred||gn.boolean(n.isPreferred))&&(void 0===n.edit||ce.is(n.edit))},(en=Ye||(Ye={})).create=function(e,n){var t={range:e};return gn.defined(n)&&(t.data=n),t},en.is=function(e){var n=e;return gn.defined(n)&&y.is(n.range)&&(gn.undefined(n.command)||X.is(n.command))},(tn=nn||(nn={})).create=function(e,n){return{tabSize:e,insertSpaces:n}},tn.is=function(e){var n=e;return gn.defined(n)&&gn.uinteger(n.tabSize)&&gn.boolean(n.insertSpaces)},(on=rn||(rn={})).create=function(e,n,t){return{range:e,target:n,data:t}},on.is=function(e){var n=e;return gn.defined(n)&&y.is(n.range)&&(gn.undefined(n.target)||gn.string(n.target))},(sn=an||(an={})).create=function(e,n){return{range:e,parent:n}},sn.is=function(e){var n=e;return void 0!==n&&y.is(n.range)&&(void 0===n.parent||sn.is(n.parent))},function(e){function n(e,t){if(e.length<=1)return e;var r=e.length/2|0,i=e.slice(0,r),o=e.slice(r);n(i,t),n(o,t);for(var a=0,s=0,u=0;a<i.length&&s<o.length;){var c=t(i[a],o[s]);e[u++]=c<=0?i[a++]:o[s++]}for(;a<i.length;)e[u++]=i[a++];for(;s<o.length;)e[u++]=o[s++];return e}e.create=function(e,n,t,r){return new fn(e,n,t,r)},e.is=function(e){var n=e;return!!(gn.defined(n)&&gn.string(n.uri)&&(gn.undefined(n.languageId)||gn.string(n.languageId))&&gn.uinteger(n.lineCount)&&gn.func(n.getText)&&gn.func(n.positionAt)&&gn.func(n.offsetAt))},e.applyEdits=function(e,t){for(var r=e.getText(),i=n(t,(function(e,n){var t=e.range.start.line-n.range.start.line;return 0===t?e.range.start.character-n.range.start.character:t})),o=r.length,a=i.length-1;a>=0;a--){var s=i[a],u=e.offsetAt(s.range.start),c=e.offsetAt(s.range.end);if(!(c<=o))throw new Error("Overlapping edit");r=r.substring(0,u)+s.newText+r.substring(c,r.length),o=u}return r}}(un||(un={}));var gn,fn=function(){function e(e,n,t,r){this._uri=e,this._languageId=n,this._version=t,this._content=r,this._lineOffsets=void 0}return Object.defineProperty(e.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),e.prototype.getText=function(e){if(e){var n=this.offsetAt(e.start),t=this.offsetAt(e.end);return this._content.substring(n,t)}return this._content},e.prototype.update=function(e,n){this._content=e.text,this._version=n,this._lineOffsets=void 0},e.prototype.getLineOffsets=function(){if(void 0===this._lineOffsets){for(var e=[],n=this._content,t=!0,r=0;r<n.length;r++){t&&(e.push(r),t=!1);var i=n.charAt(r);t="\r"===i||"\n"===i,"\r"===i&&r+1<n.length&&"\n"===n.charAt(r+1)&&r++}t&&n.length>0&&e.push(n.length),this._lineOffsets=e}return this._lineOffsets},e.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var n=this.getLineOffsets(),t=0,r=n.length;if(0===r)return w.create(0,e);for(;t<r;){var i=Math.floor((t+r)/2);n[i]>e?r=i:t=i+1}var o=t-1;return w.create(o,e-n[o])},e.prototype.offsetAt=function(e){var n=this.getLineOffsets();if(e.line>=n.length)return this._content.length;if(e.line<0)return 0;var t=n[e.line],r=e.line+1<n.length?n[e.line+1]:this._content.length;return Math.max(Math.min(t+e.character,r),t)},Object.defineProperty(e.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),e}();!function(e){var n=Object.prototype.toString;e.defined=function(e){return"undefined"!==typeof e},e.undefined=function(e){return"undefined"===typeof e},e.boolean=function(e){return!0===e||!1===e},e.string=function(e){return"[object String]"===n.call(e)},e.number=function(e){return"[object Number]"===n.call(e)},e.numberRange=function(e,t,r){return"[object Number]"===n.call(e)&&t<=e&&e<=r},e.integer=function(e){return"[object Number]"===n.call(e)&&-2147483648<=e&&e<=2147483647},e.uinteger=function(e){return"[object Number]"===n.call(e)&&0<=e&&e<=2147483647},e.func=function(e){return"[object Function]"===n.call(e)},e.objectLiteral=function(e){return null!==e&&"object"===typeof e},e.typedArray=function(e,n){return Array.isArray(e)&&e.every(n)}}(gn||(gn={}));var ln=function(){function e(n,t,r){var i=this;(0,o.Z)(this,e),(0,s.Z)(this,"_disposables",[]),(0,s.Z)(this,"_listener",Object.create(null)),this._languageId=n,this._worker=t;var a=function(e){var n,t=e.getLanguageId();t===i._languageId&&(i._listener[e.uri.toString()]=e.onDidChangeContent((function(){window.clearTimeout(n),n=window.setTimeout((function(){return i._doValidate(e.uri,t)}),500)})),i._doValidate(e.uri,t))},u=function(e){h.editor.setModelMarkers(e,i._languageId,[]);var n=e.uri.toString(),t=i._listener[n];t&&(t.dispose(),delete i._listener[n])};this._disposables.push(h.editor.onDidCreateModel(a)),this._disposables.push(h.editor.onWillDisposeModel(u)),this._disposables.push(h.editor.onDidChangeModelLanguage((function(e){u(e.model),a(e.model)}))),this._disposables.push(r((function(e){h.editor.getModels().forEach((function(e){e.getLanguageId()===i._languageId&&(u(e),a(e))}))}))),this._disposables.push({dispose:function(){for(var e in h.editor.getModels().forEach(u),i._listener)i._listener[e].dispose()}}),h.editor.getModels().forEach(a)}return(0,a.Z)(e,[{key:"dispose",value:function(){this._disposables.forEach((function(e){return e&&e.dispose()})),this._disposables.length=0}},{key:"_doValidate",value:function(e,n){this._worker(e).then((function(n){return n.doValidation(e.toString())})).then((function(t){var r=t.map((function(e){return function(e,n){var t="number"===typeof n.code?String(n.code):n.code;return{severity:hn(n.severity),startLineNumber:n.range.start.line+1,startColumn:n.range.start.character+1,endLineNumber:n.range.end.line+1,endColumn:n.range.end.character+1,message:n.message,code:t,source:n.source}}(0,e)})),i=h.editor.getModel(e);i&&i.getLanguageId()===n&&h.editor.setModelMarkers(i,n,r)})).then(void 0,(function(e){console.error(e)}))}}]),e}();function hn(e){switch(e){case N.Error:return h.MarkerSeverity.Error;case N.Warning:return h.MarkerSeverity.Warning;case N.Information:return h.MarkerSeverity.Info;case N.Hint:return h.MarkerSeverity.Hint;default:return h.MarkerSeverity.Info}}var vn=function(){function e(n,t){(0,o.Z)(this,e),this._worker=n,this._triggerCharacters=t}return(0,a.Z)(e,[{key:"triggerCharacters",get:function(){return this._triggerCharacters}},{key:"provideCompletionItems",value:function(e,n,t,r){var i=e.uri;return this._worker(i).then((function(e){return e.doComplete(i.toString(),pn(n))})).then((function(t){if(t){var r=e.getWordUntilPosition(n),i=new h.Range(n.lineNumber,r.startColumn,n.lineNumber,r.endColumn),o=t.items.map((function(e){var n,t,r={label:e.label,insertText:e.insertText||e.label,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,command:(n=e.command,n&&"editor.action.triggerSuggest"===n.command?{id:n.command,title:n.title,arguments:n.arguments}:void 0),range:i,kind:wn(e.kind)};return e.textEdit&&("undefined"!==typeof(t=e.textEdit).insert&&"undefined"!==typeof t.replace?r.range={insert:_n(e.textEdit.insert),replace:_n(e.textEdit.replace)}:r.range=_n(e.textEdit.range),r.insertText=e.textEdit.newText),e.additionalTextEdits&&(r.additionalTextEdits=e.additionalTextEdits.map(kn)),e.insertTextFormat===Ce.Snippet&&(r.insertTextRules=h.languages.CompletionItemInsertTextRule.InsertAsSnippet),r}));return{isIncomplete:t.isIncomplete,suggestions:o}}}))}}]),e}();function pn(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function mn(e){if(e)return{start:{line:e.startLineNumber-1,character:e.startColumn-1},end:{line:e.endLineNumber-1,character:e.endColumn-1}}}function _n(e){if(e)return new h.Range(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function wn(e){var n=h.languages.CompletionItemKind;switch(e){case be.Text:return n.Text;case be.Method:return n.Method;case be.Function:return n.Function;case be.Constructor:return n.Constructor;case be.Field:return n.Field;case be.Variable:return n.Variable;case be.Class:return n.Class;case be.Interface:return n.Interface;case be.Module:return n.Module;case be.Property:return n.Property;case be.Unit:return n.Unit;case be.Value:return n.Value;case be.Enum:return n.Enum;case be.Keyword:return n.Keyword;case be.Snippet:return n.Snippet;case be.Color:return n.Color;case be.File:return n.File;case be.Reference:return n.Reference}return n.Property}function kn(e){if(e)return{range:_n(e.range),text:e.newText}}var yn=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideHover",value:function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.doHover(r.toString(),pn(n))})).then((function(e){if(e)return{range:_n(e.range),contents:En(e.contents)}}))}}]),e}();function bn(e){return"string"===typeof e?{value:e}:(n=e)&&"object"===typeof n&&"string"===typeof n.kind?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"};var n}function En(e){if(e)return Array.isArray(e)?e.map(bn):[bn(e)]}var Cn=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideDocumentHighlights",value:function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.findDocumentHighlights(r.toString(),pn(n))})).then((function(e){if(e)return e.map((function(e){return{range:_n(e.range),kind:xn(e.kind)}}))}))}}]),e}();function xn(e){switch(e){case Oe.Read:return h.languages.DocumentHighlightKind.Read;case Oe.Write:return h.languages.DocumentHighlightKind.Write;case Oe.Text:return h.languages.DocumentHighlightKind.Text}return h.languages.DocumentHighlightKind.Text}var An=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideDefinition",value:function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.findDefinition(r.toString(),pn(n))})).then((function(e){if(e)return[In(e)]}))}}]),e}();function In(e){return{uri:h.Uri.parse(e.uri),range:_n(e.range)}}var Sn=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideReferences",value:function(e,n,t,r){var i=e.uri;return this._worker(i).then((function(e){return e.findReferences(i.toString(),pn(n))})).then((function(e){if(e)return e.map(In)}))}}]),e}(),Rn=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideRenameEdits",value:function(e,n,t,r){var i=e.uri;return this._worker(i).then((function(e){return e.doRename(i.toString(),pn(n),t)})).then((function(e){return function(e){if(!e||!e.changes)return;var n=[];for(var t in e.changes){var r,i=h.Uri.parse(t),o=(0,u.Z)(e.changes[t]);try{for(o.s();!(r=o.n()).done;){var a=r.value;n.push({resource:i,edit:{range:_n(a.range),text:a.newText}})}}catch(s){o.e(s)}finally{o.f()}}return{edits:n}}(e)}))}}]),e}();var Tn=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideDocumentSymbols",value:function(e,n){var t=e.uri;return this._worker(t).then((function(e){return e.findDocumentSymbols(t.toString())})).then((function(e){if(e)return e.map((function(e){return{name:e.name,detail:"",containerName:e.containerName,kind:Dn(e.kind),range:_n(e.location.range),selectionRange:_n(e.location.range),tags:[]}}))}))}}]),e}();function Dn(e){var n=h.languages.SymbolKind;switch(e){case We.File:return n.Array;case We.Module:return n.Module;case We.Namespace:return n.Namespace;case We.Package:return n.Package;case We.Class:return n.Class;case We.Method:return n.Method;case We.Property:return n.Property;case We.Field:return n.Field;case We.Constructor:return n.Constructor;case We.Enum:return n.Enum;case We.Interface:return n.Interface;case We.Function:return n.Function;case We.Variable:return n.Variable;case We.Constant:return n.Constant;case We.String:return n.String;case We.Number:return n.Number;case We.Boolean:return n.Boolean;case We.Array:return n.Array}return n.Function}var Pn=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideLinks",value:function(e,n){var t=e.uri;return this._worker(t).then((function(e){return e.findDocumentLinks(t.toString())})).then((function(e){if(e)return{links:e.map((function(e){return{range:_n(e.range),url:e.target}}))}}))}}]),e}(),Mn=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideDocumentFormattingEdits",value:function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.format(r.toString(),null,Fn(n)).then((function(e){if(e&&0!==e.length)return e.map(kn)}))}))}}]),e}(),Ln=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideDocumentRangeFormattingEdits",value:function(e,n,t,r){var i=e.uri;return this._worker(i).then((function(e){return e.format(i.toString(),mn(n),Fn(t)).then((function(e){if(e&&0!==e.length)return e.map(kn)}))}))}}]),e}();function Fn(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}var Zn=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideDocumentColors",value:function(e,n){var t=e.uri;return this._worker(t).then((function(e){return e.findDocumentColors(t.toString())})).then((function(e){if(e)return e.map((function(e){return{color:e.color,range:_n(e.range)}}))}))}},{key:"provideColorPresentations",value:function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.getColorPresentations(r.toString(),n.color,mn(n.range))})).then((function(e){if(e)return e.map((function(e){var n={label:e.label};return e.textEdit&&(n.textEdit=kn(e.textEdit)),e.additionalTextEdits&&(n.additionalTextEdits=e.additionalTextEdits.map(kn)),n}))}))}}]),e}(),jn=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideFoldingRanges",value:function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.getFoldingRanges(r.toString(),n)})).then((function(e){if(e)return e.map((function(e){var n={start:e.startLine+1,end:e.endLine+1};return"undefined"!==typeof e.kind&&(n.kind=function(e){switch(e){case M.Comment:return h.languages.FoldingRangeKind.Comment;case M.Imports:return h.languages.FoldingRangeKind.Imports;case M.Region:return h.languages.FoldingRangeKind.Region}return}(e.kind)),n}))}))}}]),e}();var On=function(){function e(n){(0,o.Z)(this,e),this._worker=n}return(0,a.Z)(e,[{key:"provideSelectionRanges",value:function(e,n,t){var r=e.uri;return this._worker(r).then((function(e){return e.getSelectionRanges(r.toString(),n.map(pn))})).then((function(e){if(e)return e.map((function(e){for(var n=[];e;)n.push({range:_n(e.range)}),e=e.parent;return n}))}))}}]),e}(),Nn=function(e){(0,r.Z)(t,e);var n=(0,i.Z)(t);function t(e){return(0,o.Z)(this,t),n.call(this,e,[".",":","<",'"',"=","/"])}return(0,a.Z)(t)}(vn);function Un(e){var n=new de(e),t=function(){return n.getLanguageServiceWorker.apply(n,arguments)},r=e.languageId;h.languages.registerCompletionItemProvider(r,new Nn(t)),h.languages.registerHoverProvider(r,new yn(t)),h.languages.registerDocumentHighlightProvider(r,new Cn(t)),h.languages.registerLinkProvider(r,new Pn(t)),h.languages.registerFoldingRangeProvider(r,new jn(t)),h.languages.registerDocumentSymbolProvider(r,new Tn(t)),h.languages.registerSelectionRangeProvider(r,new On(t)),h.languages.registerRenameProvider(r,new Rn(t)),"html"===r&&(h.languages.registerDocumentFormattingEditProvider(r,new Mn(t)),h.languages.registerDocumentRangeFormattingEditProvider(r,new Ln(t)))}function Wn(e){var n=[],t=[],r=new de(e);n.push(r);var i=function(){return r.getLanguageServiceWorker.apply(r,arguments)};return function(){var n=e.languageId,r=e.modeConfiguration;Hn(t),r.completionItems&&t.push(h.languages.registerCompletionItemProvider(n,new Nn(i))),r.hovers&&t.push(h.languages.registerHoverProvider(n,new yn(i))),r.documentHighlights&&t.push(h.languages.registerDocumentHighlightProvider(n,new Cn(i))),r.links&&t.push(h.languages.registerLinkProvider(n,new Pn(i))),r.documentSymbols&&t.push(h.languages.registerDocumentSymbolProvider(n,new Tn(i))),r.rename&&t.push(h.languages.registerRenameProvider(n,new Rn(i))),r.foldingRanges&&t.push(h.languages.registerFoldingRangeProvider(n,new jn(i))),r.selectionRanges&&t.push(h.languages.registerSelectionRangeProvider(n,new On(i))),r.documentFormattingEdits&&t.push(h.languages.registerDocumentFormattingEditProvider(n,new Mn(i))),r.documentRangeFormattingEdits&&t.push(h.languages.registerDocumentRangeFormattingEditProvider(n,new Ln(i)))}(),n.push(Vn(t)),Vn(n)}function Vn(e){return{dispose:function(){return Hn(e)}}}function Hn(e){for(;e.length;)e.pop().dispose()}}}]);
//# sourceMappingURL=6965.a283f9b3.chunk.js.map