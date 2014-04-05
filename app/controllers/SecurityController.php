<?php

class SecurityController extends BaseController {

    public function permisos() {
        return DB::table('permisos')->orderBy('grupo', 'asc')->get();
    }

    /*
      |--------------------------------------------------------------------------
      | logout
      |--------------------------------------------------------------------------
      |
      | cierra session para el usuario actual;
      |
     */

    public function logout() {
        Sentry::logout();
    }

    /*
      |--------------------------------------------------------------------------
      | current_user
      |--------------------------------------------------------------------------
      |
      | Regresa datos del usuario que esta actualmete logeado
      |
     */

    public function current_user() {

        if (!Sentry::check()) {
            return Response::json(array('msg' => 'User not logged in'), '200');
        } else {
            $user = Sentry::getUser();
            $permissions = $user->getMergedPermissions();

            $data = array();
            foreach ($permissions as $key => $val) {
                $key = str_replace('.', '_', $key);
                $data[$key] = $val;
            };

            $response = array(
                'user' => array(
                    'username' => $user->email,
                    'lastName' => $user->last_name,
                    'firstName' => $user->first_name,
                    'permissions' => $data
            ));
            return Response::make($response, 200);
        }
    }

    /*
      |--------------------------------------------------------------------------
      | Login de sistema Sentry
      |--------------------------------------------------------------------------
      |
     */

    public function login() {

        try {
            // Set login credentials
            $credentials = Input::all();
            $msg = null;
            //$user = Sentry::authenticateAndRemember($credentials, false);
            $user = Sentry::authenticate($credentials, false);
        } catch (Cartalyst\Sentry\Users\LoginRequiredException $e) {
            $msg = 'Login field is required.';
        } catch (Cartalyst\Sentry\Users\PasswordRequiredException $e) {
            $msg = 'Password field is required.';
        } catch (Cartalyst\Sentry\Users\WrongPasswordException $e) {
            $msg = 'User or password incorrect, please try again.';
        } catch (Cartalyst\Sentry\Users\UserNotFoundException $e) {
            $msg = 'User or password incorrect, please try again.';
        } catch (Cartalyst\Sentry\Users\UserNotActivatedException $e) {
            $msg = 'User is not activated.';
        }
        // The following is only required if throttle is enabled
        catch (Cartalyst\Sentry\Throttling\UserSuspendedException $e) {
            $msg = 'User is suspended.';
        } catch (Cartalyst\Sentry\Throttling\UserBannedException $e) {
            $msg = 'User is banned.';
        }
        if (!$msg) {
            $permissions = $user->getMergedPermissions();
            $data = array();
            foreach ($permissions as $key => $val) {
                $key = str_replace('.', '_', $key);
                $data[$key] = $val;
            };
            $response = array(
                'user' => array(
                    'username' => $user->email,
                    'lastName' => $user->last_name,
                    'firstName' => $user->first_name,
                    'permissions' => $permissions
                )
            );
            return Response::make($response, 200);
        } else {
            return Response::json(array('message' => $msg), '401');
        }
    }

}
