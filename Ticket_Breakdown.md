# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### Current Tables

<table style="border-collpse: collapse; border: 1px solid" >
<tr><td>Facility</td><tr>
<tr><td>id</td><tr>
</table>
<table style="border-collpse: collapse; border: 1px solid" >
<tr><td>Shift</td><tr>
<tr><td>id</td><tr>
</table>
<table style="border-collpse: collapse; border: 1px solid" >
<tr><td>Agent</td><tr>
<tr><td>id</td><tr>
<tr><td>name</td><tr>
</table>

### Steps

First we will need to create a new table in our db with the relation between facility and agent, after that we'll be able to get agents by facilityId and generate the reports.

1 - Create a table with relation between facility and agent

```
CREATE TABLE "facility_agent" (
  "id" SERIAL NOT NULL,
  "agentId" TEXT NOT NULL,
  "facilityId" TEXT NOT NULL,
  CONSTRAINT "facility_agent_pkey" PRIMARY KEY("id")
)
```

2 - To get the agents by facilityId, we can do the following code:

```
const getAgentsByFacilityId = (facilityId: string) => {
  const QUERY = 'SELECT fa.facilityId, ag.name FROM facility_agent as fa RIGHT JOIN agent AS ag ON fa.agentId = ag.id WHERE fa.facilityId = $1';
  const VALUE = [facilityId];
  try {
    // if it was using pg
    const client = await pool.connect();
    const dbResult = await client.query(QUERY, VALUE);
    return dbResult.rows;
  } catch {
    console.error('db error');
  }
}
```

3 - To create a new relation between facility and agent

```
const createFacilityAgentRealtion = (facilityId: string, agentId: string) => {
  const QUERY = 'INSERT INTO facility_agent ("facilityId", "agentId") VALUES ($1, $2)';
  const VALUE = [facilityId, agentId];
  try {
    const client = await pool.connect();
    const dbResult = await client.query(QUERY, VALUE);
    return dbResult.rows;
  } catch {
    console.error('insert record error');
  }
}
```

4 - To Generate Report, we can do:

```
const generateReportWithAgentsInFacility = await (facilityId) => {
  const result = await getAgentsByFacilityId(facilityId);
  const tableTows = result.map(r => `<tr><td>${facilityId}</td><td>${r.name}</td></tr>`)
  const asHtml = `
    <body>
      <table>
        <tr><td>Facility Id</td><td>Agent Name</td></tr>
        ${tableRows}
      </table>
    </body>
  `
  htmlToPdf.print(asHtml)
}

```
