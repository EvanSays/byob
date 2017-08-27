# Journal Resources

    GET genes

## Description
Retrieves the genes from the gene database.

***

## Parameters

**none**

***

## Authorization

**none**

***

## Return format
An array of objects with the following keys and values:

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

***

## Example
**Request**

   GET genes

**Return** __shortened for example purpose__
``` json
{
    "data": [
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
        },
        {
            "id": 1511,
            "start": 50844073,
            "end": 50844096,
            "chr": "10",
            "strand": "+",
            "cellline": "Jiyoye",
            "condition": "viability",
            "sequence": "GCAGCATCCCAACCAGGTGGAGG",
            "symbol": "A1CF",
            "ensg": "ENSG00000148584",
            "log2fc": "0.32",
            "rc_initial": "[260]",
            "rc_final": "[244]",
            "effect": 2,
            "cas": "hSpCas9",
            "screentype": "negative selection",
            "pubmed_journal": 26472758,
            "created_at": "2017-08-26T19:59:38.721Z",
            "updated_at": "2017-08-26T19:59:38.721Z"
        }
      ]
    }
```