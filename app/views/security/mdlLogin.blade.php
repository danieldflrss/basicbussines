<div class="modal-header">
    <button type="button" class="close" ng-click="cancelLogin()" aria-hidden="true">&times;</button>
    <h4 class="modal-title">{{Lang::get('application.login');}}</h4>
</div>
<div class="modal-body">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alert alert-warning" ng-show="authReason">
            #{authReason}
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alert alert-error" ng-show="authError">
            #{authError}
        </div>
    </div>
    <form  class="form-horizontal" role="form">
        <div class="form-group">
            <label for="login" class="col-xs-12 col-sm-2 col-md-2 col-lg-2 control-label">{{Lang::get('application.user');}}:</label>
            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                    <input id = "login" name="login" class="form-control" placeholder="{{Lang::get('application.user');}}" 
                           type="text" ng-model="user.email" required autofocus maxlength="100">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="pass" class="col-xs-12 col-sm-2 col-md-2 col-lg-2 control-label">{{Lang::get('application.password');}}:</label>
            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-asterisk"></span></span>
                    <input id="pass" name="pass" class="form-control" type="password" ng-model="user.password"  
                           placeholder="{{Lang::get('application.password');}}" required maxlength="25">
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button type="button" class="btn btn-default" ng-click="cancelLogin()">{{Lang::get('application.close');}}</button>
            <button type="button" class="btn btn-primary" ng-click="login()" >{{Lang::get('application.login');}}</button>
        </div>
    </div>
</div>
