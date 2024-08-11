"use client";

import PromptScreen from "../PromptScreen";
import "../styles.css";
import Assignment from "../Assignment";

function NewAssignmentView() {
  return (
    <div className="assignment-view">
      <div>
        <h2>Outline</h2>
        <p>{Assignment.outline}</p>
      </div>
      <h2>Marking Criteria</h2>
      {Object.entries(Assignment.markingCriteria).map(
        ([category, criteria], index) => (
          <div key={index}>
            <h3>{category}</h3>
            <ul>
              {criteria.map((criterion, idx) => (
                <li key={idx}>- {criterion}</li>
              ))}
            </ul>
          </div>
        )
      )}
      <h2>Learning Outcomes</h2>
      {Object.entries(Assignment.learningOutcomes).map(
        ([outcome, criteria], index) => (
          <div key={index}>
            <h3>{outcome}</h3>
            <ul>
              {criteria.map((criterion, idx) => (
                <li key={idx}>{criterion}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export default NewAssignmentView;
