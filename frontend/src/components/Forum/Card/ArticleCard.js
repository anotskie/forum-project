import React, { useState } from "react";
import { Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import BadgeMUI from "@mui/material/Badge";
import "../../../App.css";
import ModalComponent from "../Modal/NewIdeas";
import ModalComponentEdit from "../Modal/EditIdeas";

const ArticleCardComponent = ({ article, onVote }) => {
  const [votes, setVotes] = useState(article.votes || 0);
  const [voted, setVoted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const commentCount = 1000;
  const status = "NeedsReview";

  const statusColors = {
    Active: "#6ec5b8",
    Inactive: "#d8b9c3",
    NeedsReview: "#a9c3d3",
  };

  const displayStatus = status.replace(/([a-z])([A-Z])/g, "$1 $2");
  const statusColor = statusColors[status];

  const handleVote = () => {
    const updatedVotes = voted ? votes - 1 : votes + 1;
    setVotes(updatedVotes);
    setVoted(!voted);
    // onVote(article.id);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

    const handleCloseModal = () => {
    setShowModal(false);
    setEditArticle(null);
  };

  const handleEditClick = () => {
    setEditArticle(article);
    setShowModal(true);
  }; // Added closing bracket here
  
  const handleForumIconClick = () => {
    const url = `/Comments/?articleId=${article.id}`;
    // Change the URL to trigger the redirection
  
    window.location.href = url;
  };

  return (
    <Row className="article-card">
      <Col sm={2}>
        <div className={`vote-button ${voted ? "voted" : ""}`}>
          <Button
            variant={voted ? "secondary" : "outline-success"}
            size="sm"
            onClick={() => handleVote(article.id)}
            className="vote-button-inner"
          >
            {voted ? (
              <CloseIcon className="vote-icon" />
            ) : (
              <CheckIcon className="vote-icon" />
            )}
            <Badge pill variant="light" className="vote-count">
              {votes}
            </Badge>
          </Button>
        </div>
      </Col>
      <Col sm={10}>

        
        <Card className="article-content" style={{ border: "none" }}>
        <Button size="sm" variant="outline-primary" onClick={() => handleEditClick(article)}>Edit</Button>
            <ModalComponentEdit
              showEdit={showModal}
              handleCloseEdit={handleCloseModal}
              editArticle={editArticle} 
              
            
            />
            <Card.Body>
              <div>
                
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                  {article.description && article.description.length > 250
                    ? article.description.substring(0, 250) + "..."
                    : article.description}
                </Card.Text>
              
            </div>
          </Card.Body>
        </Card>


       

        <div className="comments-section d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <b>Created by: </b>
            {article.created_by}
          </div>
          <div className="d-flex align-items-center">
            <div
              className="status mr-3"
              style={{
                backgroundColor: statusColor || "#999",
                borderRadius: "5px",
                color: "#fff",
              }}
            >
              {displayStatus}
            </div>

            <div className="comment-info d-flex align-items-center">
              <div className="comment-count mr-1">
                <BadgeMUI badgeContent={commentCount} color="primary">
                  <ForumOutlinedIcon
                    onClick={handleForumIconClick}
                    style={{ cursor: "pointer" }}
                  />
                </BadgeMUI>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};



export default ArticleCardComponent;
