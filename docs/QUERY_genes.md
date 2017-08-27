# Journal Resources

    QUERY /genes?

## Description
Retrieves the specified genes from the gene database.

***

## Parameters

- **id** - Returns objects with matching 'id'
- **start** - Returns objects with matching 'start'
- **end** - Returns objects with matching 'end'
- **chr** - Returns objects with matching 'chr'
- **strand** - Returns objects with matching 'strand'
- **cellline** - Returns objects with matching 'cellline'
- **condition** - Returns objects with matching 'condition'
- **sequence** - Returns objects with matching 'sequence'
- **symbol** - Returns objects with matching 'symbol'
- **ensg** - Returns objects with matching 'ensg'
- **log2fc** - Returns objects with matching 'log2fc'
- **rc_initial** - Returns objects with matching 'rc_intial'
- **rc_final** - Returns objects with matching rc_final'
- **effect** - Returns objects with matching 'effect'
- **cas** - Returns objects with matching 'cas'
- **screentype** - Returns objects with matching 'screentype'
- **pubmed_journal** - Returns objects with matching 'pubmed_journal'
- **created_at** - Returns objects with matching 'created_at'
- **updated_at** - Returns objects with matching 'updated_at'

***

## Authorization

**none**

***

## Return format
An array of objects with the following keys and values:
  - **data** — Array of objects containing matched qualifiers
  - **id** — matched object key "id" representing an integer
  - **start** — matched object key "start" representing an integer
  - **end** — matched object key "end" representing an integer
  - **chr** — matched object key "chr" representing a string
  - **strand** — matched object key "strand" representing a string
  - **cellline** — matched object key "cellline" representing string
  - **condition** —  matched object key "condition" representing a string
  - **sequence** —matched object key "sequence" representing a string
  - **symbol** —matched object key "symbol" representing a string
  - **ensg** — matched object key "ensg" representing a string
  - **log2fc** — matched object key "log2fc" representing a decimal
  - **rc_initial** — matched object key "rc_initial" representing string
  - **rc_final** — matched object key "rc_final" representing a string
  - **effect** — matched object key "effect" representing a integer
  - **cas** — matched object key "cas" representing a string
  - **screentype** — matched object key "screentype" representing a string
  - **pubmed_journal** — matched object key object key "pubmed_journal". References the journals table
  - **created_at** — matched object key "created_at" representing a date
  - **updated_at** — matched object key "updated_at" representing a date
***

## Errors

***

## Example
**Request**

   api/v1/genes?queryParam=value

**Return** __shortened for example purpose__
```
{
    "data": [
        {
            "id": 21196,
            "start": 9116085,
            "end": 9116108,
            "chr": "12",
            "strand": "-",
            "cellline": "A375",
            "condition": "resistance to PLX-4720 (puromycin)",
            "sequence": "GAATGTAGTTTTAGCCCTCCAGG",
            "symbol": "A2M",
            "ensg": "ENSG00000175899",
            "log2fc": "-0.14",
            "rc_initial": "[1002,964]",
            "rc_final": "[154,241]",
            "effect": 0,
            "cas": "dCas9-VP64",
            "screentype": "positive selection",
            "pubmed_journal": 25494202,
            "created_at": "2017-08-27T21:47:12.801Z",
            "updated_at": "2017-08-27T21:47:12.801Z"
        },
        {
            "id": 21185,
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
            "created_at": "2017-08-27T21:47:12.798Z",
            "updated_at": "2017-08-27T21:47:12.798Z"
        }
    ]
}
```
