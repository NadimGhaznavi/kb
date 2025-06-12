---
title: MongoDB
layout: default
---

# Table of Contents

* [Installing MongoDB Community Edition](#installing-mongodb-community-edition)
* [Backup a MongoDB Collection](#backup-a-mongodb-collection)
* [Restore a MongoDB Collection](#restore-a-mongodb-collection)
* [Query MonngoDB Data by Date](#query-mongodb-data-by-date)

# Installing MongoDB Community Edition
```
sudo apt update
sudo apt install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

# Backup a MongoDB Collection
```
$ mongodump -d dev_db -c job_search 
2024-07-12T04:26:10.745-0400	writing dev_db.job_search to dump/dev_db/job_search.bson
2024-07-12T04:26:10.747-0400	done dumping dev_db.job_search (19 documents)
$
```

# Restore a MongoDB Collection
```
$ mongorestore -d prod_db job_search.bson 
2024-07-12T04:30:51.061-0400	checking for collection data in job_search.bson
2024-07-12T04:30:51.061-0400	reading metadata for prod_db.job_search from job_search.metadata.json
2024-07-12T04:30:51.692-0400	restoring prod_db.job_search from job_search.bson
2024-07-12T04:30:51.858-0400	finished restoring prod_db.job_search (19 documents, 0 failures)
2024-07-12T04:30:51.858-0400	no indexes to restore for collection prod_db.job_search
2024-07-12T04:30:51.858-0400	19 document(s) restored successfully. 0 document(s) failed to restore.
$
```

# Query MonngoDB Data by Date

Example:
```
{ 
  "doc_type": "share_found_event", 
  "timestamp": 
  { 
    "$gte": ISODate("2024-09-01T00:00:00Z"), 
    "$lt": ISODate("2024-11-01T00:00:00Z") 
  } 
}
```
# Links

* [MongoDb Homepage](https://www.mongodb.com/)
* [MongoDb ulimit settings](https://www.mongodb.com/docs/manual/reference/ulimit/)
* [Hevo MongoDb Replication HOWTO](https://hevodata.com/learn/mongodb-replica-set-config/)
* [MongoDB Replication](https://www.mongodb.com/docs/manual/replication/)
* [Create and Query a Time Series Collection](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-procedures/#std-label-timeseries-create-query-procedures)
* [Analyze Time-Series Data with Python and MongoDB Using PyMongoArrow and Pandas](https://www.mongodb.com/developer/products/mongodb/time-series-data-pymongoarrow/)
