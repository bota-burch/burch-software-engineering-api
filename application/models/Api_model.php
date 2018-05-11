<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');


	class Api_model extends CI_Model {



	public function __construct()
	{
		parent::__construct();
	}

	public function register($data)

	{
		 $this->mongo_db->insert('users',$data);
		 return true;
    }

    public function getUserByEmail($email_id)
	 {
	   	$this->mongo_db->select('id,name,email_id,phone_number,status,username,age', '_id');
	   	$this->mongo_db->where('username', $email_id);
	   	$this->mongo_db->where('status', 1);
	   	$this->mongo_db->where('is_deleted', 0);
	   	$this->mongo_db->limit(1);

	    $query = $this->mongo_db->get('users');
	 	return $query;
	 }

	

	 function checkAccountLogin($data)
 	{
	   	$this -> mongo_db -> select('id,name,email_id,phone_number,status,username');
	   	$this -> mongo_db -> where('username', $data['username']);
	  	$this -> mongo_db -> where('password',MD5($data['password']));
	   	$this -> mongo_db -> where('status', 1);
	   	$this -> mongo_db -> where('is_deleted', 0);
	   	$this -> mongo_db -> limit(1);

	   $query = $this -> mongo_db -> get('users');
	 	return $query;
 	}

 	

 	public function get_current_counter($key)
	{
		 $this ->mongo_db-> select($key);
		 $this ->mongo_db-> limit(1);
		 $query = $this->mongo_db->get('counters');
		 return $query;
	}

	public function update_counter($key)
	{
		$result = $this->get_current_counter($key);
		$count  = $result[0][$key];
		$result = $this->mongo_db->where(array($key=>$count))->set($key, (int)$count+1)->update('counters');
		$result = $this->get_current_counter($key);
		return $result[0][$key];
	}

	





}
?>
