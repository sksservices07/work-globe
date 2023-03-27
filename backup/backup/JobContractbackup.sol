// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import '@openzeppelin/contracts/utils/Counters.sol';


//import "./CandidateContract.sol";

contract JobContract is Initializable, ContextUpgradeable, OwnableUpgradeable {
    
    using Counters for Counters.Counter;

    struct Job {
        uint256 jobId; // job index starts from 0
        string companyName;
        string position;
        string description;
        string experience;
        string location;
        string salary;
        uint256 applicationCount;
        address employer;
        string status;
        address employee;
    }

    struct Register {
        uint256 registrationID;
        string name;
        string typeOfAccount;
        string myAddress;
        address user;
    }

    struct Candidate {
        uint256 candJobID;
        uint256 registrationID;
        uint256 jobId;
        string name;
        string experience;
        string location;
        string cv;
        address candidateAddress;
        string status;
    }

    uint256 public JOB_ID;
    Job[] private jobs;
    
    mapping(address => address[]) public candidates;
    

    //CandidateContract public candidateContract;
    Counters.Counter public _registrationID;
     Counters.Counter public _candJobID;
    Register[] private register;
    mapping(address => Register) public registerProfile;
    Candidate[] private candidate;
    mapping(address => mapping(uint256 => Candidate)) public totalCandidates;
    mapping(uint256 => Job) public jobData;

    function initialize(
        //address _candidateContractAddress
        ) public initializer {
        //candidateContract = CandidateContract(_candidateContractAddress);
            __Ownable_init();
            JOB_ID = 1;
    }

    function checkRegistration() public view returns (bool){
      if(registerProfile[msg.sender].registrationID == 0){
          return false;
      }else{
          return true;
      }
    }
    
    function registerProfiles(string memory _name, string memory _typeOfAccount, string memory _myAddress) external {
      require(!checkRegistration(),"You are already registered.");
      _registrationID.increment();
      Register memory data = Register(
        _registrationID.current(),
        _name,_typeOfAccount,_myAddress,msg.sender);
      registerProfile[msg.sender] = data;
      register.push(data);
    }

    function myAppliedJobs() external view returns (Job[] memory){
        uint256 candUserId = registerProfile[msg.sender].registrationID;
        uint256 currentIndex = 0;
        Job[] memory items = new Job[](JOB_ID);
        for (uint256 i = 0; i < _candJobID.current(); i++) {
        if (candidate[i].registrationID == candUserId ) {
                uint256 jobId = candidate[i].jobId;
                Job storage jobItem = jobData[jobId];
                items[currentIndex] = jobItem;
                currentIndex += 1;
            }
        }
        return items;
    }

  function applyForJob(uint256 jobId, string memory _name, string memory _experience, string memory _location, string memory _cv) external {
      
      Candidate memory data = Candidate(
        _candJobID.current(),
        registerProfile[msg.sender].registrationID,
        jobData[jobId].jobId,
        _name,
        _experience,
        _location,
        _cv,
        msg.sender,
        "applied");
      totalCandidates[msg.sender][jobData[jobId].jobId] = data;
      candidate.push(data);
      jobData[jobId].applicationCount ++;
      _candJobID.increment();
  }

  function getMyCandidates(uint256 _jobId) external view returns(Candidate[] memory){
    require(jobData[_jobId].employer == msg.sender,"Access Denied !!Owner is ");
    uint256 totalAppCount = jobData[_jobId].applicationCount;
        uint256 currentIndex = 0;
        uint256 totCandidates = _candJobID.current();

        Candidate[] memory items = new Candidate[](totalAppCount);
        for (uint256 i = 0; i < totCandidates; i++) {
        if (candidate[i].jobId == _jobId && keccak256(abi.encodePacked(candidate[i].status)) == keccak256(abi.encodePacked("applied"))) {
                Candidate storage currentItem = candidate[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
  }

  function selectCandidate(uint256 _jobId, address _candAddress) external {
    require(jobData[_jobId].employer == msg.sender,"Access Denied !!");
    totalCandidates[_candAddress][_jobId].status = "selected";
    jobs[_jobId - 1].status = "closed";
    jobData[_jobId].status = "closed";
    jobs[_jobId - 1].employee = _candAddress;
    jobData[_jobId].employee = _candAddress;
  }

  function getMyProfile()  external view returns (Register memory){
    return registerProfile[msg.sender];
  }
   function getProfile(address user)  external view returns (Register memory){
    return registerProfile[user];
  }

  function getAllProfile() external view returns (Register[] memory){
    return register;
  }

    // add job
    function addJob(
        string memory _companyName,
        string memory _position,
        string memory _description,
        string memory _experience,
        string memory _location,
        string memory _salary
    ) public {
        Job memory job = Job({
            jobId: JOB_ID,
            companyName: _companyName,
            position: _position,
            description: _description,
            experience: _experience,
            location: _location,
            salary: _salary,
            applicationCount: 0,
            employer: _msgSender(),
            status: "open",
            employee:address(0)
        });
        jobs.push(job);
        jobData[JOB_ID] = job;
        JOB_ID++;
    }

    // list all jobs
    function allJobs() public view returns (Job[] memory) {
        return jobs;
    }

    function getJobById(uint256 _jobid) public view returns (Job memory) {
        return jobs[_jobid];
    }
    function getMyPostedJobs() public view returns(Job[] memory){
        uint256 totalJobCount = JOB_ID - 1;
        uint256 currentIndex = 0;

        Job[] memory items = new Job[](totalJobCount);
        for (uint256 i = 1; i <= totalJobCount; i++) {
        if (jobData[i].employer == msg.sender) {
                Job storage currentItem = jobData[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
