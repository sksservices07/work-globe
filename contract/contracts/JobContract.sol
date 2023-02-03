// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import '@openzeppelin/contracts/utils/Counters.sol';


import "./CandidateContract.sol";

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
    }

    struct Register {
        uint256 registrationID;
        string name;
        string typeOfAccount;
        string myAddress;
        address user;
    }

    struct Candidate {
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
    

    CandidateContract public candidateContract;
    Counters.Counter public _registrationID;
    Register[] private register;
    mapping(address => Register) public registerProfile;
    Candidate[] private candidate;
    mapping(uint256 => mapping(uint256 => Candidate)) public totalCandidates;
    mapping(uint256 => Job) public jobData;

    function initialize(
        address _candidateContractAddress
        ) public initializer {
        candidateContract = CandidateContract(_candidateContractAddress);
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

  function applyForJob(uint256 jobId, string memory _name, string memory _experience, string memory _location, string memory _cv) external {
      
      Candidate memory data = Candidate(
        registerProfile[msg.sender].registrationID,
        jobData[jobId].jobId,
        _name,
        _experience,
        _location,
        _cv,
        msg.sender,
        "applied");
      totalCandidates[registerProfile[msg.sender].registrationID][jobData[jobId].jobId] = data;
      candidate.push(data);
      jobData[jobId].applicationCount ++;
  }

  function getMyCandidates(uint256 _jobId) external view returns(Candidate[] memory){
    require(jobData[_jobId].employer == msg.sender,"Access Denied !!");
    uint256 totalAppCount = jobData[_jobId].applicationCount;
        uint256 currentIndex = 0;
        uint256 totCandidates = candidate.length;

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

  function selectCandidate(uint256 _jobId, uint256 _registrationId) external {
    require(jobData[_jobId].employer == msg.sender,"Access Denied !!");
    totalCandidates[_registrationId][_jobId].status = "selected";
  }

  function getMyProfile()  external view returns (Register memory){
    return registerProfile[msg.sender];
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
            employer: _msgSender()
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
        for (uint256 i = 0; i < totalJobCount; i++) {
        if (jobs[i].employer == msg.sender) {
                Job storage currentItem = jobs[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
    // delete Job
    // this is highly gas consuming task
    function deleteJob(uint256 _jobId) public {
        require(
            _msgSender() == jobs[_jobId].employer || _msgSender() == owner(),
            "You are neither employer of this job nor owner."
        );

        if (_jobId >= jobs.length) return;
        for (uint256 i = _jobId; i < jobs.length - 1; i++) {
            jobs[i] = jobs[i + 1];
            jobs[i].jobId = i;
        }

        jobs.pop();
        JOB_ID--;
    }

    // candidate will apply for job
    // function applyForJob(uint256 _jobid) public {
    //     candidateContract.getCandidateByAddress(_msgSender()); // will automatically throw error if candidate with _msgSender doesn't exists

    //     address[] memory appliedCandidates = candidates[jobs[_jobid].employer];
    //     for (uint256 i = 0; i < appliedCandidates.length; i++) {
    //         require(
    //             appliedCandidates[i] != _msgSender(),
    //             "You have already registered for this job using this address."
    //         );
    //     }

    //     candidates[jobs[_jobid].employer].push(_msgSender());
    // }

    // returns total number of jobs
    function totalJobs() public view returns (uint256) {
        return jobs.length;
    }

    function getAppliedCandidatesByJobId(uint256 _jobid)
        public
        view
        returns (address[] memory)
    {
        require(
            jobs[_jobid].employer == _msgSender(),
            "You are not employer of this job."
        );
        return candidates[jobs[_jobid].employer];
    }

    function withdrawFunds(address _to) public onlyOwner {
        payable(_to).transfer(address(this).balance);
    }
}
