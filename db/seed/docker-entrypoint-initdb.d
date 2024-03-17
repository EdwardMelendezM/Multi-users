-- auto-generated definition
create table users
(
    id         varchar(36)  not null,
    email      varchar(255) not null,
    password   varchar(255) not null,
    created_at timestamp    not null,
    deleted_at timestamp    null
);


-- auto-generated definition
create table views
(
    id         varchar(36)  not null
        primary key,
    name       varchar(255) not null,
    path       varchar(255) not null,
    number     int          null,
    created_at timestamp    not null,
    deleted_at timestamp    null
);



