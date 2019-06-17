import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses } from "store/actions";

import SearchCard from "components/UI/SearchCard/";
import ClassMembersOverview from "components/Pages/ClassMembers/List/Overview";
import ClassMembersTab from "components/Pages/ClassMembers/List/Tab";
import GroupsTab from "components/Pages/Groups/List/Tab";
import TrainingSeriesOverview from "components/Pages/TrainingSeries/List/Overview";
import TrainingSeriesTab from "components/Pages/TrainingSeries/List/Tab";
import NotificationsCard from "components/Pages/Notifications/Card";
import NotificationsOverview from "components/Pages/Notifications/Card/Overview/Overview.js";
import Responses from "components/Pages/Notifications/Responses";
import TabNavigation from "./helpers/TabNavigation.js";
import DektopNavigation from "./helpers/DesktopNavigation.js";

import {
  TripleColumn,
  SmallColumns,
  Divider,
  DashWrapper,
  MobileNav,
  DesktopNav
} from "./styles.js";

function Dashboard(props) {
  const [topTab, setTopTab] = useState("overview");
  const [newResponses, setNewResponses] = useState([]);
  const {
    user_id,
    history,
    responses,
    getAllResponses: responsesFromProps
  } = props;

  useEffect(() => {
    responsesFromProps();
    setTimeout(() => {
      responsesFromProps();
    }, 60 * 1000);
  }, [responsesFromProps]);

  useEffect(() => {
    setNewResponses(responses.filter(r => !r.seen));
  }, [responses]);

  return (
    <DashWrapper>
      <MobileNav>
        <TabNavigation
          topTab={topTab}
          setTopTab={setTopTab}
          newResponses={newResponses}
        />
      </MobileNav>
      <DesktopNav>
        <DektopNavigation topTab={topTab} setTopTab={setTopTab} />
      </DesktopNav>

      <TripleColumn>
        {topTab === "overview" && (
          <>
            <SmallColumns>
              <SearchCard
                user_id={user_id}
                List={ClassMembersOverview}
                containerTourNum="1"
                section="Class Members"
                headerTourNum={["2", "3"]}
                handleAdd={() => history.push("/home/create-class-member")}
              />
              <Divider />
              <SearchCard
                user_id={user_id}
                List={TrainingSeriesOverview}
                containerTourNum="4"
                section="Training Series"
                handleAdd={() => history.push("/home/create-training-series")}
              />
            </SmallColumns>
            <NotificationsCard List={NotificationsOverview} user_id={user_id} />
          </>
        )}

        {topTab === "class members" && (
          <SearchCard
            user_id={user_id}
            List={ClassMembersTab}
            section="Class Members"
            handleAdd={() => history.push("/home/create-class-member")}
            isSearching={true}
          />
        )}

        {topTab === "training series" && (
          <SearchCard
            user_id={user_id}
            List={TrainingSeriesTab}
            section="Training Series"
            handleAdd={() => history.push("/home/create-training-series")}
            isSearching={true}
            limit={3}
          />
        )}

        {topTab === "notifications" && (
          <div style={{ width: "100%" }}>
            <NotificationsCard
              List={NotificationsOverview}
              user_id={user_id}
              width="95%"
            />
          </div>
        )}
        {topTab === "responses" && (
          <Responses history={props.history} user_id={user_id} />
        )}
        {topTab === "groups" && (
          <SearchCard
            user_id={user_id}
            List={GroupsTab}
            section="Groups"
            handleAdd={() => history.push("/home/create-class-member")}
            isSearching={true}
          />
        )}
      </TripleColumn>
    </DashWrapper>
  );
}

const mapStateToProps = state => ({
  responses: state.responsesReducer.responses
});

export default connect(
  mapStateToProps,
  { getAllResponses }
)(Dashboard);
