import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import PersonalDetails from "./Form/PersonalDetails";
import Summary from "./Form/Summary";
import Experience from "./Form/Experience";
import Education from "./Form/Education";
import Skills from "./Form/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import Projects from "./Form/Projects";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const params = useParams();

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-row items-center gap-2 w-full md:w-auto">
          <Link to={"/"}>
            <Button size="sm" variant="outline" className="h-9 w-9 p-0">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex gap-2 w-full md:w-auto justify-end">
          {activeFormIndex > 1 && (
            <Button
              className="flex gap-2"
              size="sm"
              variant="outline"
              onClick={() => {
                setActiveFormIndex((prevIndex) => prevIndex - 1);
              }}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
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
            Next
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {activeFormIndex === 1 && (
          <PersonalDetails
            enableNext={(val) => {
              setEnableNext(val);
            }}
          />
        )}
        {activeFormIndex === 2 && <Education />}
        {activeFormIndex === 3 && (
          <Summary
            enableNext={(val) => {
              setEnableNext(val);
            }}
          />
        )}
        {activeFormIndex === 4 && (
          <Experience
            enableNext={(val) => {
              setEnableNext(val);
            }}
          />
        )}
        {activeFormIndex === 5 && (
          <Projects
            enableNext={(val) => {
              setEnableNext(val);
            }}
          />
        )}
        {activeFormIndex === 6 && (
          <Skills
            enableNext={(val) => {
              setEnableNext(val);
            }}
          />
        )}
        {activeFormIndex === 7 && (
          <Navigate to={`/my-resume/${params.resumeId}/view`} />
        )}
      </div>
    </div>
  );
}

export default FormSection;
