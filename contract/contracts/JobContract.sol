// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

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

    uint256 private JOB_ID;
    Job[] private jobs;

    mapping(address => address[]) private candidates;

    Counters.Counter private _registrationID;
    Counters.Counter public _candJobID;
    Register[] private register;
    mapping(address => Register) private registerProfile;

    Candidate[] private candidate;
    mapping(address => mapping(uint256 => Candidate)) private totalCandidates;

    mapping(uint256 => Job) private jobData;

// change in contract - add name 
    // Struct for storing bid details
    struct Bid {
        address freelancer;
        string name;
        uint256 jobId;
        string location;
        string cv;
        uint256 fee;
        uint256 estimatedCompletionTime;
        string experience;
    }

    // Mapping of candidate address to array of bids
    mapping(address => Bid[]) private bidOfCandidate;

    // Mapping of job IDs to array of bids
    mapping(uint256 => Bid[]) private bids;

    function initialize() public initializer {
        __Ownable_init();
        JOB_ID = 1;
    }

    function checkRegistration() public view returns (bool) {
        if (registerProfile[msg.sender].registrationID == 0) {
            return false;
        } else {
            return true;
        }
    }

    function registerProfiles(
        string memory _name,
        string memory _typeOfAccount,
        string memory _myAddress
    ) external {
        require(!checkRegistration(), "You are already registered.");
        _registrationID.increment();
        Register memory data = Register(
            _registrationID.current(),
            _name,
            _typeOfAccount,
            _myAddress,
            msg.sender
        );
        registerProfile[msg.sender] = data;
        register.push(data);
    }

    function myAppliedJobs() external view returns (Job[] memory) {
        uint256 currentIndex = 0;
        uint256 bidCount = bidOfCandidate[msg.sender].length;
        Job[] memory items = new Job[](JOB_ID);
        for (uint256 i = 0; i < bidCount; i++) {
            uint256 jobId = bidOfCandidate[msg.sender][i].jobId;
            Job storage jobItem = jobData[jobId];
            items[currentIndex] = jobItem;
            currentIndex += 1;
        }
        return items;
    }

    function applyForJob(
        uint256 jobId,
        string memory _experience,
        uint256 _fee,
        uint256 _estimatedCompletionTime,
        string memory _location,
        string memory _cv
    ) external {
        require(checkRegistration(), "You are not registered.");
        string memory name = registerProfile[msg.sender].name;
        Bid memory data = Bid(
            msg.sender,
            name,
            jobData[jobId].jobId,
            _location,
            _cv,
            _fee,
            _estimatedCompletionTime,
            _experience
        );

        bidOfCandidate[msg.sender].push(data);
        bids[jobId].push(data);

        jobData[jobId].applicationCount++;
    }

    function getMyCandidates(
        uint256 _jobId
    ) external view returns (Bid[] memory) {
        require(
            jobData[_jobId].employer == msg.sender,
            "Access Denied !!Owner is "
        );
        uint256 totalAppCount = jobData[_jobId].applicationCount;
        uint256 currentIndex = 0;
        uint256 totCandidates = bids[_jobId].length;
        Bid[] memory items = new Bid[](totalAppCount);
        for (uint256 i = 0; i < totCandidates; i++) {
            Bid storage currentItem = bids[_jobId][i];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function selectCandidate(uint256 _jobId, address _candAddress) external {
        require(jobData[_jobId].employer == msg.sender, "Access Denied !!");
        jobs[_jobId - 1].status = "closed";
        jobData[_jobId].status = "closed";
        jobs[_jobId - 1].employee = _candAddress;
        jobData[_jobId].employee = _candAddress;
    }

    function getMyProfile() external view returns (Register memory) {
        return registerProfile[msg.sender];
    }

    function getProfile(address user) external view returns (Register memory) {
        return registerProfile[user];
    }

    function getAllProfile() external view returns (Register[] memory) {
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
    ) external {
        require(checkRegistration(), "You are not registered.");
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
            employee: address(0)
        });
        jobs.push(job);
        jobData[JOB_ID] = job;
        JOB_ID++;
    }

    // list all jobs
    function allJobs() external view returns (Job[] memory) {
        return jobs;
    }

    function getJobById(uint256 _jobid) external view returns (Job memory) {
        return jobs[_jobid];
    }

    function getMyPostedJobs() external view returns (Job[] memory) {
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
