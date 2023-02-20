// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";


contract FeedbackContract is Initializable, ContextUpgradeable, OwnableUpgradeable {
    struct Feedback {
        address reviewer;
        address reviewed;
        uint256 rating;
        string comments;
    }

    Feedback[] private feedbackList;
    uint256 private feedBack_id;
    mapping (uint256 => Feedback) private feedback;

    event NewFeedback(address indexed reviewer, address indexed reviewed, uint256 rating, string comments);

    function initialize() public initializer {
         __Ownable_init();
        feedBack_id = 1;
    }

    function addFeedback(address _reviewed, uint256 _rating, string memory _comments) external {
        Feedback memory feedbackItem = Feedback(msg.sender, _reviewed, _rating, _comments);
        feedbackList.push(feedbackItem);
        feedback[feedBack_id] = feedbackItem;
        feedBack_id ++;
        emit NewFeedback(msg.sender, _reviewed, _rating, _comments);
    }

    function getFeedbackCount() external view returns (uint256) {
        return feedbackList.length;
    }

    // function getFeedback(uint256 _index) external view returns (address, address, uint256, string memory) {
    //     require(_index < feedbackList.length, "Index out of range");
    //     Feedback memory feedback = feedbackList[_index];
    //     return (feedback.reviewer, feedback.reviewed, feedback.rating, feedback.comments);
    // }

    function getUserFeedbacks(address _user) external view returns (Feedback[] memory){
        uint256 totalFeedback = feedbackList.length;
        uint256 currentIndex = 0;
        Feedback[] memory items = new Feedback[](totalFeedback);
        for (uint256 i = 1; i <= totalFeedback; i++) {
        if (feedback[i].reviewed == _user ) {
                Feedback storage feedItem = feedback[i];
                items[currentIndex] = feedItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getAllMyGivenFeedbacks() external view returns (Feedback[] memory){
        uint256 totalFeedback = feedbackList.length;
        uint256 currentIndex = 0;
        Feedback[] memory items = new Feedback[](totalFeedback);
        for (uint256 i = 1; i <= totalFeedback; i++) {
        if (feedback[i].reviewer == msg.sender ) {
                Feedback storage feedItem = feedback[i];
                items[currentIndex] = feedItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
