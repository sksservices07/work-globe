// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import "@openzeppelin/contracts/utils/Strings.sol";

contract Job is Initializable, OwnableUpgradeable {
    struct Job {
        uint256 jobId;
        string companyName;
        string position;
        string description;
        string experience;
        string location;
        string salary;
        address employer;
    }

    uint256 public JOB_ID;
    Job[] public jobs;
    mapping(address => address[]) public applicants;

    // add job

    function initialize() public initializer {
        JOB_ID = 0;
    __Ownable_init();
  }
    function addJob(
        string memory _companyName,
        string memory _position,
        string memory _description,
        string memory  experience,
        string memory _location,
        string memory salary
    ) public payable {
        require(msg.value == 5 * 10**15);
        Job memory job = Job({
            jobId: JOB_ID,
            companyName: _companyName,
            position: _position,
            description: _description,
            experience: experience,
            location: _location,
            salary: salary,
            employer: msg.sender
        });
        jobs.push(job);
        JOB_ID++;
    }

    // list all jobs
    function allJobs() public view returns (Job[] memory) {
        return jobs;
    }

    // delete Job
    // this is highly gas consuming task
    function deleteJob(uint256 _jobId) public {
        require(msg.sender == jobs[_jobId].employer || msg.sender == owner());

        if (_jobId >= jobs.length) return;
        for (uint256 i = _jobId; i < jobs.length - 1; i++) {
            jobs[i] = jobs[i + 1];
            jobs[i].jobId = i;
        }
        delete jobs[jobs.length - 1];
        JOB_ID--;
    }

    // candidate will apply for job
    function applyForJob(uint256 _jobid) public {
        applicants[jobs[_jobid].employer].push(msg.sender);
    }

    // returns total number of jobs
    function totalJobs() public view returns (uint256) {
        return jobs.length;
    }
}
