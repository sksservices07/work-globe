// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract MilestoneContract {
    enum MilestoneStatus {
        CREATED,
        RELEASED,
        CANCELLED
    }

    struct Milestone {
        uint256 amount;
        uint256 dueDate;
        MilestoneStatus status;
    }

    struct Project {
        address client;
        address freelancer;
        uint256 totalAmount;
        Milestone[] milestones;
        bool isCancelled;
        bool isDisputed;
        uint256 disputedAmount;
    }

    mapping(uint256 => Project) public projects;

    function createProject(
        uint256 projectId,
        address freelancer,
        uint256 totalAmount
    ) public payable {
        require(
            msg.value == totalAmount,
            "The sent amount doesn't match the total amount"
        );
        require(freelancer != address(0), "Freelancer address is invalid");

        Project storage project = projects[projectId];
        require(project.client == address(0), "Project ID already exists");

        project.client = msg.sender;
        project.freelancer = freelancer;
        project.totalAmount = totalAmount;
    }

    function addMilestone(
        uint256 projectId,
        uint256 amount,
        uint256 dueDate
    ) public {
        Project storage project = projects[projectId];
        require(
            project.client == msg.sender,
            "Only clients can add milestones"
        );
        require(!project.isCancelled, "Project has been cancelled");

        Milestone memory milestone = Milestone(
            amount,
            dueDate,
            MilestoneStatus.CREATED
        );
        project.milestones.push(milestone);
    }

    function cancelMilestone(uint256 projectId, uint256 milestoneIndex) public {
        Project storage project = projects[projectId];
        require(
            project.client == msg.sender,
            "Only clients can cancel milestones"
        );
        require(
            milestoneIndex < project.milestones.length,
            "Milestone index out of bounds"
        );

        Milestone storage milestone = project.milestones[milestoneIndex];
        require(
            milestone.status == MilestoneStatus.CREATED,
            "Milestone is not in CREATED status"
        );

        uint256 elapsedTime = block.timestamp - milestone.dueDate;
        if (elapsedTime <= 1 hours) {
            payable(project.client).transfer(milestone.amount);
            milestone.status = MilestoneStatus.CANCELLED;
        } else {
            milestone.status = MilestoneStatus.CANCELLED;
            project.isDisputed = true;
            project.disputedAmount += milestone.amount;
        }
    }

    function releaseMilestone(uint256 projectId, uint256 milestoneIndex)
        public
    {
        Project storage project = projects[projectId];
        require(
            project.freelancer == msg.sender,
            "Only freelancers can release milestones"
        );
        require(
            milestoneIndex < project.milestones.length,
            "Milestone index out of bounds"
        );

        Milestone storage milestone = project.milestones[milestoneIndex];
        require(
            milestone.status == MilestoneStatus.CREATED,
            "Milestone is not in CREATED status"
        );

        uint256 elapsedTime = block.timestamp - milestone.dueDate;
        require(elapsedTime > 0, "Milestone is not yet due");

        payable(project.freelancer).transfer(milestone.amount);
        milestone.status = MilestoneStatus.RELEASED;
    }

    function cancelProject(uint256 projectId) public {
        Project storage project = projects[projectId];
        require(
            project.client == msg.sender,
            "Only clients can cancel projects"
        );
        require(!project.isCancelled, "Project is already cancelled");

        if (project.isDisputed) {
            // Dispute resolution required
            revert("Please contact dispute team");
        } else if (project.freelancer == address(0)) {
            // Project not yet accepted by freelancer
            payable(project.client).transfer(project.totalAmount);
        } else {
            // Freelancer already accepted

            uint256 amountToRefundToClient = 0;
            for (uint256 i = 0; i < project.milestones.length; i++) {
                if (project.milestones[i].status == MilestoneStatus.CREATED) {
                    amountToRefundToClient += project.milestones[i].amount;
                }
            }

            payable(project.client).transfer(amountToRefundToClient);
        }
    }

    function acceptProject(uint256 _projectId) public {
        Project storage project = projects[_projectId];
        require(
            project.freelancer == address(0),
            "Freelancer already accepted this project."
        );

        project.freelancer = msg.sender;
    }
}
