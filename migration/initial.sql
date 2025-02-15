create type gender_type as ENUM ('male','female','other');
create type login_strategy as ENUM ('local','facebook','twitter','google');
create type post_type as ENUM ('text','video','image','audio','link','poll');
create type goal_type as ENUM ('subscription_count','money');
create type benefit_period as ENUM ('one_time','monthly');
create type card_brand_type as ENUM ('jcb','visa','mastercard','american_express','diners_club');
create table users
(
    id         int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    username   varchar,
    email      varchar,
    password   varchar,
    verified   bool,
    social_id  varchar,
    strategy   login_strategy,
    first_name varchar,
    last_name  varchar,
    phone_number varchar,
    gender     gender_type,
    refresh_token varchar,
    created_at timestamptz,
    updated_at timestamptz
);

create table user_info(
    user_id int8 primary key references users,
    last_logged_in_date timestamptz,
    last_logged_in_ip varchar,
    created_ip varchar
);
--TODO commissions,aka shop;


create view fetch_user_safe as
SELECT u.id, u.username, u.gender, u.created_at, u.updated_at, u.verified
From users as u;

create view fetch_user_self as
select u.id,
       u.username,
       u.email,
       u.gender,
       u.first_name,
       u.last_name,
       u.created_at,
       u.updated_at,
       u.verified,
       u.strategy,
       u.social_id
from users as u;

create table category
(
    id          int8 PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    banner      varchar,
    name        varchar,
    description varchar,
    created_at  timestamptz,
    updated_at  timestamptz
);
create table creator_rank
(
    id   int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    fee  float8,
    name varchar,
    rank int4
);


create table creator
(
    id              int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    name            varchar,
    bio     text,
    banner_image_id int8 references file,
    cover_image_id int8 references file,
    user_id         int8 references users,
    creator_rank_id int4 references creator_rank on delete set null,
    updated_at      timestamptz,
    created_at      timestamptz
);

create table creator_profile
(
    legal_first_name            varchar,
    legal_last_name             varchar,
    -- earning_visibility          bool,
    -- subscriber_count_visibility bool,
    creator_id                  int8 primary key references creator on delete cascade
);

create table project(
    id int8,
    name            varchar,
    page_url        varchar,
    description     text,
    creating        text,
    creator_id     int8 references creator,
    cover_id int8 references file,
    category_id     int4 references category
    setting jsonb,
    created_at timestamptz,
    updated_at timestamptz
);

create table project_info(
    project_id int8 references project,

);
create function create_project(_user_id int8, _name varchar, _description text,
                               _cover int8, _category_id int4, _banner int8) returns RECORD as
$$
declare
    _project_id int8;
    _access_id  int8;
BEGIN
    insert into project(name, description, banner_image_id, cover_image_id, category_id, user_id, updated_at,
                        created_at)
    VALUES (_name, _description, _banner, _cover, _category_id, _user_id, now(), now())
    returning id into _project_id;

    insert into tier(title, description, cover_image_id, price, project_id, created_at, updated_at)
    values ('公共', '投稿を表示する相手がアカウント保持者または登録者以外にもされる', 1, 0, _project_id, now(), now());

    select id into _access_id from access where site = true and name = 'owner';

    INSERT INTO project_access(project_id, user_id, access_id) values (_project_id, _user_id, _access_id);
END
$$ language plpgsql;



create table access
(
    id                   int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    site                 bool,
    name                 varchar,
    setting jsonb
);

create table project_access
(
    project_id int8 references project on delete cascade,
    user_id    int8 references users on delete cascade,
    access_id  int8 references access,
    primary key (creator_id, user_id, access_id)
);

create table tier
(
    id          int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    title       varchar,
    description text,
    cover_image_id       int8 references file,
    price       float8,
    project_id  int8 references project on delete cascade,
    created_at  timestamptz,
    updated_at  timestamptz
);


create table subscription
(
    user_id                int8 primary key references users on delete cascade,
    expiry_date            timestamptz,
    tier_id                int primary key references tier,
    created_at             timestamptz,
    stripe_subscription_id varchar
);



create table post
(
    id             int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    title          varchar,
    content        text,
    mature         bool,
    project_id     int8 references project on delete cascade,

    submit_user_id int8 references users on delete set null,
    created_at     timestamptz,
    updated_at     timestamptz
);

create table post_vote
(
    user_id    int8 references users on delete cascade,
    vote       int4,
    post_id    int8 references post on delete cascade,
    created_at timestamptz,
    primary key (user_id,post_id)
);



create table comment
(
    id             int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    user_id        int8 references users on delete set null,
    content        text,
    parent_id      int8 references comment,
    parent_user_id int8 references users,
    post_id        int8 references post on delete cascade,
    created_at     timestamptz,
    updated_at     timestamptz
);

create table comment_vote
(
    user_id    int8 references users on delete cascade,
    vote       int4,
    comment_id int8 references comment on delete cascade,
    created_at timestamptz,
    primary key (user_id,comment_id)
);

create table post_tier
(
    post_id int8 references post on delete cascade,
    tier_id int8 references tier,
    primary key (post_id, tier_id)
);

create table post_text
(
    post_id    int8 primary key references post on delete cascade,
    word_count int8,
    char_count int8
);

create table tag
(
    id         int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    name       varchar,
    created_at timestamptz
);

create table post_tag
(
    post_id int8 references post on delete cascade,
    tag_id  int8 references tag on delete cascade,
    primary key (tag_id, post_id)
);



create table file
(
    id         int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    location   varchar,
    size       int8,
    file_name  varchar,
    mime_type  varchar,
    created_at timestamptz,
    updated_at timestamptz,
    user_id    int8 references users,
    meta       JSONB
);
-- TODO BELOW
create table post_poll_option
(
    id      int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    name    varchar,
    post_id int8 references post on delete cascade
);

create table post_poll_answer
(
    user_id             int8 references users,
    post_poll_option_id int8 references post_poll_option on delete cascade,
    primary key (user_id, post_poll_option_id)
);



create table post_file
(
    post_id    int8 references post on delete cascade,
    file_id    int8 references file,
    attachment bool,
    primary key (post_id, file_id)
);

create table post_link
(
    post_id int8 references post,
    link    varchar
);

create table goal
(
    id          int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    description text,
    goal        float8,
    type goal_type,
    project_id  int8 references project on delete cascade,
    created_at  timestamptz,
    updated_at  timestamptz
);

create table benefit
(
    id          int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    description text,
    type        benefit_period,
    created_at  timestamptz,
    updated_at  timestamptz
);

create table tier_benefit
(
    tier_id    int8 references tier on delete cascade,
    benefit_id int8 references benefit on delete cascade,
    primary key (tier_id, benefit_id)
);

create table payment_method
(
    id         int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    full_name  varchar,
    created_at timestamptz,
    updated_at timestamptz,
    user_id    int8 references users on delete cascade,
    default    bool
);

create table stripe_card_payment_method
(
    payment_method_id        int8 primary key references payment_method on delete cascade,
    last_four                int4,
    brand                    card_brand_type,
    expire_date              timestamptz,
    stripe_payment_method_id varchar
);

create table stripe_bank_payment_method
(
    payment_method_id        int8 primary key references payment_method on delete cascade,
    last_four                int4,
    stripe_payment_method_id varchar
);

create table payout_method
(
    id         int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    full_name  varchar,
    created_at timestamptz,
    updated_at timestamptz,
    creator_id int8 references creator on delete cascade,
    default    bool
);

create table stripe_card_payout_method
(
    payout_method_id        int8 primary key references payout_method on delete cascade,
    last_four               int4,
    brand                   card_brand_type,
    expire_date             timestamptz,
    stripe_payout_method_id varchar
);

create table stripe_bank_payout_method
(
    payout_method_id        int8 primary key references payout_method on delete cascade,
    last_four               int4,
    stripe_payout_method_id varchar
);

create table transaction
(
    id                  int8 GENERATED BY DEFAULT AS IDENTITY primary key,
    amount              float8,
    sender_id           int8 references users,
    receiver_project_id int8 references project not null,
    created_at          timestamptz,
    updated_at          timestamptz
);

create table payout_transaction
(
    payout_method_id int8 references payout_method on delete cascade,
    transaction_id   int8 references transaction,
    primary key (payout_method_id, transaction_id)
);

create table subscription_transaction
(
    subscription_id int8 references subscription on delete cascade,
    transaction_id  int8 references transaction on delete cascade,
    primary key (subscription_id, transaction_id)
);

create table donation_transaction
(
    transaction_id int8 references transaction primary key,
    message        text,
    name           varchar,
    private        bool
);

-- create table commission(
--
-- );
create function update_post(_post_id int8, _user_id int8, _title varchar, _content text, _tiers int8[], _mature bool,
                            _type post_type, _post jsonb, _tags int8[],_attachments int8[]) as
$$
DECLARE
    i           jsonb;
    _tag_id     int8;
    _tier_id    int8;
    _file_id    int8;
    _exist      bool;
    _project_id int8;
    _file       int8;
    _attachment int8;
BEGIN
    select project_id into _project_id from tier where id = _tiers[1];
    select exists(select ca.*
                  from project_access ca
                           inner join access a on a.id = ca.access_id and a.update_post = true
                  where ca.user_id = _user_id
                    and ca.project_id = _project_id)
    into _exist;

    IF NOT _exist THEN
         raise exception '401';
    END IF;

    update post
    set title      = _title,
        content    = _content,
        mature     = _mature,
        updated_at = now()
    where id = _post_id;
    case
        when _type = 'text'::post_type then
            update post_text
            set word_count = _post ->> 'word_count'::int8,
                char_count = _post ->> 'char_count'::int8
            where post_id = _post_id;
        when _type = 'audio'::post_type or _type = 'video'::post_type or _type = 'image'::post_type then
            delete from post_file where _post_id = _post_id;
            for _file in SELECT * FROM jsonb_array_elements(_post)
                LOOP
                    if _file ->> 'id' is not null then
                        Insert into post_file(post_id, file_id, attachment)
                        VALUES (_post_id, _file ->> 'id'::int8, false);
                    else
                        INSERT INTO file(location, size, file_name, mime_type, created_at, updated_at, user_id, meta)
                        VALUES (_file ->> 'location', _file ->> 'size'::int8, _file ->> 'file_name',
                                _file ->> 'mime_type', now(),
                                now(), _user_id, _file -> 'meta')
                        RETURNING id into _file_id;
                        INSERT INTO post_file(post_id, file_id, attachment)
                        VALUES (_post_id, _file_id, false);
                    end if;
                end loop;
        when _type = 'link'::post_type then
            update post_link set link = _post ->> 'link' where post_id = _post_id;
        when _type = 'poll'::post_type then
            for i IN SELECT * FROM jsonb_array_elements(_post)
                LOOP
                    INSERT INTO post_poll_option(name, post_id) VALUES (i ->> 'option', _post_id);
                end loop;
        end case;
    delete from post_tag where post_id = _post_id;
    for _tag_id IN _tags
        LOOP
            INSERT INTO post_tag(tag_id, post_id) VALUES (_tag_id, _post_id);
        end loop;
    delete from post_tier where post_id = _post_id;
    for _tier_id IN _tiers
        LOOP
            INSERT INTO post_tier(tier_id, post_id) VALUES (_tier_id, _post_id);
        end loop;
    delete from post_file where post_id = _post_id and attachment = true;
    
         for _attachment in _attachments
            LOOP
               INSERT INTO post_file(post_id, file_id, attachment)
                VALUES (_post_id, _attachment, true);
            end loop;
END;
$$ language plpgsql;

create function create_post(_user_id int8, _title varchar, _content text, _tiers int8[], _mature bool,
                            _type post_type, _post jsonb, _tags int8[], _attachments int8[]) as
$$
declare
    _post_id    int8;
    i           jsonb;
    _tag_id     int8;
    _tier_id    int8;
    _file_id    int8;
    _exist      bool;
    _creator_id int8;
    _file       jsonb;
    _attachment int8;
BEGIN
    select creator_id into _creator_id from tier where id = _tiers[1];
    select exists(select ca.*
                  from creator_access ca
                           inner join access a on a.id = ca.access_id and a.create_post = true
                  where ca.user_id = _user_id
                    and ca.creator_id = _creator_id)
    into _exist;

    IF NOT _exist THEN
        raise exception '401';
    END IF;

    insert into post(title, content, mature, created_at, updated_at)
    VALUES (_title, _content, _mature, now(), now())
    returning id into _post_id;
    case
        when _type = 'text'::post_type then
            INSERT INTO post_text(post_id, word_count, char_count)
            VALUES (_post_id, _post ->> 'word_count'::int8, _post ->> 'char_count'::int8);
        when _type = 'audio'::post_type or _type = 'video'::post_type or _type = 'image'::post_type then
            for _file in SELECT * FROM jsonb_array_elements(_post)
                LOOP
                    INSERT INTO file(location, size, file_name, mime_type, created_at, updated_at, user_id, meta)
                    VALUES (_file ->> 'location', _file ->> 'size'::int8, _file ->> 'file_name', _file ->> 'mime_type',
                            now(),
                            now(), _user_id, _file -> 'meta')
                    RETURNING id into _file_id;
                    INSERT INTO post_file(post_id, file_id, attachment)
                    VALUES (_post_id, _file_id, false);
                end loop;

        when _type = 'link'::post_type then
            Insert into post_link(post_id, link) VALUES (_post_id, _post ->> 'link');
        when _type = 'poll'::post_type then
            for i IN SELECT * FROM jsonb_array_elements(_post)
                LOOP
                    INSERT INTO post_poll_option(name, post_id) VALUES (i ->> 'option', _post_id);
                end loop;
        end case;

        for _tag_id IN _tags
        LOOP
            INSERT INTO post_tag(tag_id, post_id) VALUES (_tag_id, _post_id);
        end loop;
        for _tier_id IN _tiers
        LOOP
            INSERT INTO post_tier(tier_id, post_id) VALUES (_tier_id, _post_id);
        end loop;
    for _attachment in _attachments
            LOOP
               INSERT INTO post_file(post_id, file_id, attachment)
                VALUES (_post_id, _attachment, true);
        end loop;

END
$$ language plpgsql;

