import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tour from "reactour";
import Progress from "../Progress/ProgressCircle";
import styled from "styled-components";

class DashboardTour extends Component {
  render() {
    return (
      <>
        {this.props.isTourOpen && (
          <Tour
            accentColor="#451477"
            steps={this.state.dashboardSteps}
            isOpen={this.props.isTourOpen}
            onRequestClose={this.props.closeTour}
          />
        )}
      </>
    );
  }
  state = {
    tourToDisplay: "Dashboard",
    dashboardSteps: [
      {
        content:
          "Welcome to Training Bot! Our little bot helper will help you through getting started!"
      },
      {
        selector: '[data-tour="1"]',
        content: "This is where you will see all of your team members.",
        stepInteraction: false,
        position: "top"
      },
      {
        selector: '[data-tour="2"]',
        content:
          "Once you have some team members, you can search through them by clicking this button.",
        stepInteraction: false
      },
      {
        selector: '[data-tour="3"]',
        content: "Here you can create a new team member.",
        stepInteraction: false
      },
      {
        selector: '[data-tour="4"]',
        content:
          "This is your Training Series. A training series is like a little house for the content you'd like to send. Give it a name and some content, then assign team members to recieve the content"
      },
      {
        selector: '[data-tour="5"]',
        content:
          "This is your notification window. Once you've assigned team members to your training series, you will see all outgoing messages here."
      },
      {
        selector: '[data-tour="6"]',
        content:
          "Your account information and current membership plan can be viewed by clicking your profile icon here."
      },
      {
        content: (
          <Container>
            <p>
              We're thrilled to have you as a part of Training Bot. Take a poke
              around, and please don't hesitate to
              <Link to="/home/contact"> contact us</Link> if you have any
              questions or concerns!
            </p>
            <ImageContainer>
              <Progress />
            </ImageContainer>
          </Container>
        )
      }
    ]
  };
}
export default DashboardTour;
const Container = styled.div``;
const ImageContainer = styled.div`
  margin-top: 65px;
  display: flex;
  justify-content: center;
  img {
    width: 50px;
  }
`;
