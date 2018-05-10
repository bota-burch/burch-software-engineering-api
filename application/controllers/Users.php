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
