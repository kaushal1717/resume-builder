import { ArrowLeftIcon, ArrowRightIcon, LayoutGridIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import PersonalDetails from "./Form/PersonalDetails";
import Summary from "./Form/Summary";
import Experience from "./Form/Experience";
import Education from "./Form/Education";
import Skills from "./Form/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ViewResume from "@/Pages/ViewResume";
import ThemeColor from "./ThemeColor";
import ProjectForm from "./Form/Projects";
import Project from "./Form/Projects";
import Projects from "./Form/Projects";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const params = useParams();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-2">
          <Link to={"/"}>
            <Button size="sm">
              <ArrowLeftIcon />
            </Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              className="flex gap-2"
              size="sm"
              onClick={() => {
                setActiveFormIndex((prevIndex) => prevIndex - 1);
              }}
            >
              <ArrowLeftIcon />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => {
              setActiveFormIndex((prevIndex) => prevIndex + 1);
            }}
          >
            <ArrowRightIcon />
            Next
          </Button>
        </div>
      </div>
      {activeFormIndex == 1 && (
        <PersonalDetails
          enableNext={(val) => {
            setEnableNext(val);
          }}
        />
      )}
      {activeFormIndex == 2 && <Education />}
      {activeFormIndex == 3 && (
        <Summary
          enableNext={(val) => {
            setEnableNext(val);
          }}
        />
      )}
      {activeFormIndex == 4 && (
        <Experience
          enableNext={(val) => {
            setEnableNext(val);
          }}
        />
      )}
      {activeFormIndex == 5 && (
        <Projects
          enableNext={(val) => {
            setEnableNext(val);
          }}
        />
      )}
      {activeFormIndex == 6 && (
        <Skills
          enableNext={(val) => {
            setEnableNext(val);
          }}
        />
      )}
      {activeFormIndex == 7 && (
        <Navigate to={`/my-resume/${params.resumeId}/view`} />
      )}
    </div>
  );
}

export default FormSection;
