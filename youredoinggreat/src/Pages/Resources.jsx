import React from "react";
import "./resources.css";

const resources = [
  { name: "Suicide Action Montreal", phone: "1-866-277-3553", hours: "24/7" },
  {
    name: "Canada Suicide Prevention Service",
    phone: "1-833-456-4566",
    hours: "24/7",
    text: "45645",
    textHours: "4 p.m. to midnight everyday",
  },
  {
    name: "TRACOM Centre for Crisis Intervention",
    phone: "tel:514-483-3033",
    hours: "24/7",
  },
  {
    name: "West Island Crisis Centre (West Island/Macdonald Campus area)",
    phone: "514-684-6160",
    hours: "24/7",
  },
  {
    name: "Sexual Assault Provincial Helpline",
    phone: "1-888-933-9007",
    hours: "24/7",
  },
  {
    name: "Drug and Alcohol Help Line",
    phone: "514-527-2626",
    hours: "24/7",
  },
];

export default function Resources() {
  return (
    <div style={{ backgroundColor: "#DEF9F1", display: "flex" }}>
      <div>
        <div className="title">
          <br></br>
          Never be afraid to reach out for help!
        </div>
        <div className="subtitle">Here are some resources to do so:</div>

        {resources.map((m) => {
          return (
            <div className="resource" style={{ paddingBottom: "20px" }}>
              <div className="resource-title">{m.name}</div>
              <div style={{ display: "flex" }}>
                <div
                  style={{ paddingRight: "10px" }}
                >{`Phone: ${m.phone} (${m.hours})`}</div>
              </div>
              {m.text && (
                <div style={{ display: "flex" }}>
                  <div
                    style={{ paddingRight: "10px" }}
                  >{`Text: ${m.text} (${m.textHours})`}</div>
                </div>
              )}
            </div>
          );
        })}
        <div className="bottom-line" />
      </div>
    </div>
  );
}
