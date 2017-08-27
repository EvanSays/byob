# Journal Resources

    PATCH genes/:id

## Description
Update the genes parameter specified by its id and body.

***

## Parameters

** requires one or more params in body

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

## Authorization
**headers**

authorization: ["token"]

***

## Return format
An array of objects with the following keys and values:

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

500

***

## Example
**Request**

   PATCH genes/:id

**Return** __shortened for example purpose__
``` json
  [
    {
        "id": 1503,
        "start": 9115770,
        "end": 9115793,
        "chr": "",
        "strand": "-",
        "cellline": "A375",
        "condition": "resistance to PLX after 7 days",
        "sequence": "CCCACAGACGCCTCAGTCTCTGG",
        "symbol": "A2M",
        "ensg": "ENSG00000175899",
        "log2fc": "0.01",
        "rc_initial": "[24,26]",
        "rc_final": "[20,30]",
        "effect": 0,
        "cas": "hSpCas9",
        "screentype": "positive selection",
        "pubmed_journal": 24336571,
        "created_at": "2017-08-26T19:59:38.717Z",
        "updated_at": "2017-08-26T19:59:38.717Z"
    }
]
```