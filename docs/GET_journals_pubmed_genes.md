# Journal Resources

    GET journals/:pubmed/genes

## Description
Retrieves the genes connected to a certain pubmed journal.
***

## Parameters

**pubmed_journal**

***

## Authorization
none

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
404 : Could not find genes with pubmed id of [pubmed]

***

## Example
**Request**

   GET journals/:pubmed/genes

**Return** __shortened for example purpose__
``` json
[
    {
        "id": 1517,
        "start": 50836139,
        "end": 50836162,
        "chr": "10",
        "strand": "-",
        "cellline": "HT29",
        "condition": "viability (Avana library 4 designs)",
        "sequence": "GCAGATAAAACCAAAAACCGAGG",
        "symbol": "A1CF",
        "ensg": "ENSG00000148584",
        "log2fc": "1.49",
        "rc_initial": "[]",
        "rc_final": "[]",
        "effect": 6,
        "cas": "hSpCas9",
        "screentype": "negative selection",
        "pubmed_journal": 26780180,
        "created_at": "2017-08-26T19:59:38.722Z",
        "updated_at": "2017-08-26T19:59:38.722Z"
    },
    {
        "id": 1518,
        "start": 50859916,
        "end": 50859939,
        "chr": "10",
        "strand": "-",
        "cellline": "HT29",
        "condition": "viability (Avana library 4 designs)",
        "sequence": "GGAATCAAATCACAAATCCGGGG",
        "symbol": "A1CF",
        "ensg": "ENSG00000148584",
        "log2fc": "0.07",
        "rc_initial": "[]",
        "rc_final": "[]",
        "effect": 0,
        "cas": "hSpCas9",
        "screentype": "negative selection",
        "pubmed_journal": 26780180,
        "created_at": "2017-08-26T19:59:38.722Z",
        "updated_at": "2017-08-26T19:59:38.722Z"
    }
]
```