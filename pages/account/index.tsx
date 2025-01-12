import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import IssueListItem, { IIssue } from "components/issue-list-item";
import GithubMicroService from "services/github-microservice";
import useAccount from "hooks/useAccount";
import Account from "components/account";

export default function MyIssues() {
  const account = useAccount();
  const [issues, setIssues] = useState<IIssue[]>([]);

  useEffect(() => {
    (async function getIssues() {
      try {
        if (account.issuesIds?.length) {
          const issues = await GithubMicroService.getIssues(account.issuesIds);

          setIssues(issues);
        }
      } catch (error) {
        console.log("MyIssues getIssues", error);
      }
    })();
  }, []);

  return (
    <Account>
      <div className="container">
        <div className="row justify-content-center">
          {issues.map((issue) => (
            <div className="col-md-10" key={issue.issueId}>
              <IssueListItem issue={issue}></IssueListItem>
            </div>
          ))}
        </div>
      </div>
    </Account>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
