import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layouts/Header";

const EventsPage = () => {
  //const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      <div>
        <Header activeHeading={4} />
        <EventCard active={true} />
      </div>
    </>
  );
};

export default EventsPage;
