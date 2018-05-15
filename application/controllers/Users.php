<?php

ini_set("display_errors","0");

error_reporting(1);

if (!defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Users extends REST_Controller

{

    function __construct()
    {   
        parent::__construct();
        $this->load->helper('url');
        $this->load->library('session');
        $this->load->model('api_model');
    }

    

    public function signup_post()
    {
        $post_data = $this->post();

        $post_data['name'] = str_replace("+", " ", $post_data['name']);
        $post_data['username'] = str_replace("%40", "@", $post_data['username']);
       
        $emailExist = $this->api_model->getUserByEmail($post_data['username']);
        if (count($emailExist) > 0) {
                 $this->set_response(['status' => FALSE, 'message' => 'email Id already exist'], REST_Controller::HTTP_BAD_REQUEST);
                return;

        }

       
        if (isset($post_data['password']) )
            $post_data['password'] = md5($post_data['password']);
        
       

        $post_data['status'] = 1;
        $post_data['is_deleted'] = 0;
        $post_data['is_blocked'] = 0;
        $post_data['authentication_token'] = $this->randomString();
        $post_data['id'] = $this->api_model->update_counter('users_count');

        $this->api_model->register($post_data);
      
        $result = $this->api_model->getUserByEmail($post_data['username']);
        unset($result[0]['_id']);

        $this->set_response(['status' => TRUE, 'data' => $result[0], 'message' => 'User has been registered successfully'], REST_Controller::HTTP_OK);
    }

    

    public function login_post()
    {
        $post_data = $this->post();
        $requiredFields = array(
            'username',
            'password'
        );
        $message = $this->validate($post_data, $requiredFields);
        if ($message != '') {
            $this->set_response(['status' => FALSE, 'message' => $message], REST_Controller::HTTP_BAD_REQUEST);
            return;
        }

        $result = $this->api_model->checkAccountLogin($post_data);

        if ($result == false) {
            $this->set_response(['status' => FALSE, 'message' => 'username or the password do not match'], REST_Controller::HTTP_BAD_REQUEST);
            return;
        }
        else {
            $authToken = $this->randomString();
            $result[0]['authentication_token'] = $authToken;
          
            $this->set_response(['status' => TRUE, 'data' => $result[0], 'message' => 'User has logged in successfully'], REST_Controller::HTTP_OK);
        }
    }

  
    
    private function validate($data, $requiredFields = array())
    {
        $message = '';
        $count = 0;
        for ($i = 0; $i < count($requiredFields); $i++) {
            if (array_key_exists($requiredFields[$i], $data) && trim($data[$requiredFields[$i]]) == '') {
                $count++;
                if ($count != 1) $message.= ", ";
                $message.= $requiredFields[$i];
            }
            else
            if (!array_key_exists($requiredFields[$i], $data)) {
                $message = $requiredFields[$i] . " key is missing";
                return $message;
            }
        }

        if ($message != '') {
            if ($count > 1) $message.= " fields are required.";
            else $message.= " field is required";
        }

        return $message;
    }

    
    private function randomString()
    {
        $timestamp = str_replace(' ', '', microtime());
        $timestamp = str_replace('.', '', $timestamp);
        $length = 10;
        $chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str.= $chars[mt_rand(0, strlen($chars) - 1) ];
        }

        $str = $str . $timestamp;
        return $str;
    }


}
