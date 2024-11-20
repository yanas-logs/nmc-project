select
  topics.id as topic_id,
  topics.name as topic_name,
  COUNT(courses.id) as course_count
from
  courses
  join course_topics on course_topics.course_id = courses.id
  join topics on topics.id = course_topics.topic_id
where
  courses.id in (
    select
      courses.id as course_id
    from
      courses
      join course_topics ctq on ctq.course_id = courses.id
    where
      courses.category = 1
      AND ctq.topic_id in (499)
    group by
      courses.id
    having
      COUNT(ctq.topic_id) = 1
  )
group by
  topics.id;

select 
  category.id, 
  category.name as category_name, 
  COUNT(case when courses.avg_rating > 3 then 1 end) as rating_3_up, 
  COUNT(case when courses.avg_rating > 3.5 then 1 end) as rating_3_half_up, 
  COUNT(case when courses.avg_rating > 4 then 1 end) as rating_4_up, 
  COUNT(case when courses.avg_rating > 4.5 then 1 end) as rating_4_half_up, 
  COUNT(case when courses.is_paid = true then 1 end) as paid, 
  COUNT(case when courses.is_paid = false then 1 end) as free, 
  COUNT(case when courses.level = 1 then 1 end) as level1, 
  COUNT(case when courses.level = 2 then 1 end) as level2, 
  COUNT(case when courses.level = 3 then 1 end) as level3, 
  COUNT(case when courses.level = 4 then 1 end) as level4
from 
  courses
  left join category on courses.category = category.id
  left join sub_category on courses.sub_category = sub_category.id
where 
  category.name in ('Devlopment')
  AND sub_category.name in ('Web Devlopment')
group by
  category.id;


create or replace function get_category_filters(
  categories text[],
  sub_categories text[],
  topics text[],
  levels numeric[],
  rating numeric,
  languages text[],
  price boolean[]
) returns json as
$$
declare
  filteredcourses bigint[];
  response json;
begin

  if topics is not null then
    select array(select
      id
    from
      courses_sm
    where
      (categories is null or category in (SELECT unnest(categories)))
      AND (sub_categories is null or sub_category in (select unnest(sub_categories)))
      AND (levels is null or level in (select unnest(levels)))
      AND (rating is null or avg_rating >= rating)
      AND (languages is null or language in (select unnest(languages)))
      AND (price is null or is_paid in (select unnest(price)))
      AND (topics is null or topic in (select unnest(topics)))
    group by
      id
    having
      COUNT(topic) = array_length(topics, 1)) into filteredcourses;
  else 
    select array(select
      id
    from
      courses_sm
    where
      (categories is null or category in (SELECT unnest(categories)))
      AND (sub_categories is null or sub_category in (select unnest(sub_categories)))
      AND (levels is null or level in (select unnest(levels)))
      AND (rating is null or avg_rating >= rating)
      AND (languages is null or language in (select unnest(languages)))
      AND (price is null or is_paid in (select unnest(price)))
    group by
      id) into filteredcourses;
  end if;

  select json_build_object (
    'result_one', 
    (select json_agg(row_to_json(t))
      from (select
        category, 
        COUNT(distinct case when avg_rating >= 3 then id end) as rating_3_up, 
        COUNT(distinct case when avg_rating >= 3.5 then id end) as rating_3_half_up, 
        COUNT(distinct case when avg_rating >= 4 then id end) as rating_4_up, 
        COUNT(distinct case when avg_rating >= 4.5 then id end) as rating_4_half_up, 
        COUNT(distinct case when is_paid = true then id end) as paid, 
        COUNT(distinct case when is_paid = false then id end) as free, 
        COUNT(distinct case when level = 1 then id end) as level1, 
        COUNT(distinct case when level = 2 then id end) as level2, 
        COUNT(distinct case when level = 3 then id end) as level3, 
        COUNT(distinct case when level = 4 then id end) as level4
      from 
        courses_sm
      where
        id in (select unnest(filteredcourses))
      group by
        category) t
    ),
    'result_two',
    (
      select json_agg(row_to_json(t))
      from (
        select
          topic, 
          COUNT(distinct id) as topic_count
        from 
          courses_sm
        where
          id in (select unnest(filteredcourses))
        group by
          topic
      ) t
    )
  ) into response;

  return response;
end;
$$
language plpgsql;

create or replace view courses_sm as
select courses.id, category.name as category, sub_category.name as sub_category, courses.avg_rating, courses.language, courses.is_paid, courses.level, topics.name as topic
from
  courses
  join category on category.id = courses.category
  join sub_category on sub_category.id = courses.sub_category
  join course_topics on course_topics.course_id = courses.id
  join topics on topics.id = course_topics.topic_id;

create or replace view courses_md as
select courses.id, courses.image, courses.title, courses.short_description, category.name as category, sub_category.name as sub_category, user_profile.username as instructor, courses.avg_rating, count(distinct enrollment.id) as enrollment, courses.is_paid, courses.level, price.amount as amount, tags.name as tag, topics.name as topic
from
  courses
  join category on category.id = courses.category
  join sub_category on sub_category.id = courses.sub_category
  join course_instructor on course_instructor.course_id = courses.id
  join user_profile on course_instructor.user_id = user_profile.user_id
  join course_tags on course_tags.course_id = courses.id
  join tags on tags.id = course_tags.tag_id
  join course_topics on course_topics.course_id = courses.id
  join enrollment on enrollment.course_id = courses.id
  join price on price.course_id = courses.id
  join topics on topics.id = course_topics.topic_id
group by
  courses.id, category.name, sub_category.name, user_profile.username, price.amount, tags.name, topics.name;

create or replace view courses_avg_rating as
select courses.id, AVG(course_review.rating) as avg_rating
from courses
left join course_review on course_review.course_id = courses.id
group by courses.id
order by courses.id;

create or replace view course_category_sub_category_avg_rating as
select courses.id, category.name as category_name, sub_category.name as sub_category_name, courses_avg_rating.avg_rating
from courses
left join category on courses.category = category.id
left join sub_category on courses.sub_category = sub_category.id
left join courses_avg_rating on courses.id = courses_avg_rating.id;

create or replace view category_wise_courses_count_on_different_rating_range as
select category.id, category.name as category_name, COUNT(case when courses_avg_rating.avg_rating > 3 then 1 end) as rating_3_up, COUNT(case when courses_avg_rating.avg_rating > 3.5 then 1 end) as rating_3_half_up, COUNT(case when courses_avg_rating.avg_rating > 4 then 1 end) as rating_4_up, COUNT(case when courses_avg_rating.avg_rating > 4.5 then 1 end) as rating_4_half_up
from courses
left join category on courses.category = category.id
left join courses_avg_rating on courses.id = courses_avg_rating.id
group by category.id;

create or replace view category_wise_courses_count_on_different_topics as
select category.id as category_id, category.name as category_name, topics.id as topic_id, topics.name as topic_name, COUNT(courses.id) course_count
from courses
left join category on courses.category = category.id
left join course_topics on courses.id = course_topics.course_id
left join topics on course_topics.topic_id = topics.id
group by category.id, topics.id
order by category.id;

create or replace view category_wise_courses_count_on_different_sub_categories as
select category.id as category_id, category.name as category_name, sub_category.id as sub_category_id, sub_category.name as sub_category_name, COUNT(courses.id) course_count
from courses
left join category on courses.category = category.id
left join sub_category on courses.sub_category = sub_category.id
group by category.id, sub_category.id
order by category.id;

