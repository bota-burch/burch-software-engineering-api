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

		function getUser($userid)
	 {
	 	$this->mongo_db->select(array(),array('_id','password'));
	   	$this->mongo_db->where(array('id'=>(int)$userid));
	   	$this ->mongo_db-> limit(1);
	   	$query = $this ->mongo_db-> get('users');
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

 		public function update_user($data=array(),$Where=array())
	{
		$result = $this->mongo_db->where($Where)->set($data)->update('users');
		return $result;
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

	function addExperience($data)
 	{
 		 $this->mongo_db->insert('userExperiences',$data);
		 return true;
 	}

 	function getExperience($data)
 	{	
 		if(isset($data)){
 			$query = $this->mongo_db->get_where('userExperiences',$data);
 		}else{
 			$query  = $this->mongo_db->get('userExperiences');
 		}
		return $query;
 	}


 	function removeExperience($id)
 	{	$this->mongo_db->where(array('id'=>(int)$id))->delete('userExperiences');
		 return true;
 	}


 	function addSkill($data)
 	{
 		 $this->mongo_db->insert('userSkills',$data);
		 return true;
 	}

 	function getSkill($data)
 	{	
 		if(isset($data)){
 			$query = $this->mongo_db->get_where('userSkills', $data);
 		}else{
 			$query  = $this->mongo_db->get('userSkills');
 		}
		return $query;
 	}


 	function addEducation($data)
 	{
 		 $this->mongo_db->insert('userEducation',$data);
		 return true;
 	}

 	function removeEducation($id)
 	{	
 		$this->mongo_db->where(array('id'=>(int)$id))->delete('userEducation');
		 return true;
 	}


 	function getEducation($data)
 	{	
 		if(isset($data)){
 			$query = $this->mongo_db->get_where('userEducation',$data);
 		}else{
 			$query  = $this->mongo_db->get('userEducation');
 		}
		return $query;
 	}

 	function addCompany($data)
 	{
 		 $this->mongo_db->insert('company',$data);
		 return true;
 	}


 	function getCompany($name)
 	{	
 		if(isset($name)){
 			$query = $this->mongo_db->get_where('company', array('name' => $name));
 		}else{
 			$query  = $this->mongo_db->get('company');
 		}
		return $query;
 	}


 	function removeCompany($id)
 	{	
 		$this->mongo_db->where(array('id'=>(int)$id))->delete('company');
		 return true;
 	}


 	function getCompanyById($id)
 	{	
 		if(isset($id)){
 			$query = $this->mongo_db->get_where('company', array('id' => (int)$id));
 		}else{
 			$query  = $this->mongo_db->get('company');
 		}
		return $query;
 	}






}
?>
