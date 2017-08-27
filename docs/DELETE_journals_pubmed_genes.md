# Journal Resources

    DELETE journals/:pubmed/genes

## Description
Deletes the genes connected to a certain pubmed journal.

***

## Parameters

**pubmed**

***

## Authorization
**headers**

authorization: ["token"]

***

## Return format
An array or objects with the following keys and values:

- **id** -
- **start** -
- **end** -
- **chr** -
- **strand** -
- **cellline** -
- **condition** -
- **sequence** -
- **symbol** -
- **ensg** -
- **log2fc** -
- **rc_initial** -
- **rc_final** -
- **effect** -
- **cas** -
- **screentype** -
- **pubmed_journal** - Publication pubmed id.
- **created_at** -
- **updated_at** -
- **updated_at** -

***

## Errors
404 : Missing required parameter [requiredParameter]

***

## Example
**Request**

   DELETE journals/:pubmed/genes

**Return** __shortened for example purpose__
``` json
{
    "res": "The genes linked to '27260156' and all it's corresponding data has been destroyed.",
    "data": 2
}
```