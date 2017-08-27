# Journal Resources

    DELETE genes/:id

## Description
Removes a gene from the database based on its id.

***

## Parameters

- **id**

***

## Authorization
**headers**

authorization: ["token"]

***

## Return format

**data:1**

***

## Errors

422 - Missing required parameter [requiredParameter]

***

## Example
**Request**

   DELETE genes/:id

**Return** __shortened for example purpose__
``` json
 {
    "res": "The id '1503' and all it's corresponding data has been destroyed. Forever.",
    "data": 1
}```