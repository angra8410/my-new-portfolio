# Bellabeat Smart Device Usage Analysis

A case study focused on identifying behavior patterns in non-Bellabeat smart device users and translating those findings into practical marketing recommendations for Bellabeat.

---

## Executive Summary

Bellabeat wants to understand how people use smart devices in their daily lives so the company can refine product positioning, engagement tactics, and lifecycle marketing.  
Using public Fitbit-style activity data, this analysis explores weekly and monthly usage patterns, time-of-day behavior, and user engagement segments.

The analysis shows that:

- **Engagement peaks midweek and on weekends**, especially on Wednesdays, Mondays, Saturdays, and Fridays.
- **Activity increases from March to April**, suggesting a strong seasonal opportunity for spring campaigns or movement challenges.
- **Afternoons and nights drive the highest activity**, making those periods strong candidates for notification timing and in-app nudges.
- **User behavior splits into active and inactive cohorts**, which supports segmented retention and re-engagement strategies.

Based on these findings, Bellabeat could prioritize personalized messaging, seasonal challenges, and segment-based campaigns to improve adoption and long-term engagement.

---

## Business Task

Analyze smart device usage data to answer the following questions:

1. What trends appear in smart device usage?
2. How could those trends apply to Bellabeat customers?
3. How could those trends influence Bellabeat’s marketing strategy?
4. Which Bellabeat product could benefit most from these insights?

---

## Dataset

This project uses public smart device usage data commonly associated with the Bellabeat case study.  
The analysis focuses on non-Bellabeat user behavior as a proxy for broader wearable usage patterns.

---

## Tools Used

- **SQL** for data cleaning, transformation, and exploratory analysis
- **Stored Procedures** for repeatable logic and summary generation
- **Power BI** for dashboarding and visual exploration
- **Markdown** for project documentation

---

## Workflow

### 1. Data Preparation
The dataset was reviewed and cleaned to improve consistency and analytical reliability.

Main preparation steps included:
- reviewing available tables and fields
- validating usage-related variables
- standardizing formats where necessary
- preparing summary outputs for downstream analysis

### 2. Exploratory Analysis
The analysis focused on four practical angles:

- **Seasonality by day and month**
- **User activity distribution**
- **Activity by time of day**
- **User segmentation**

### 3. Visualization
Power BI was used to create visuals that support the business narrative and make the results easier to interpret for non-technical stakeholders.

---

## Key Insights

### 1. Weekly Seasonality
Device usage is not evenly distributed across the week.

- Highest engagement appears on **Wednesdays**
- Strong activity also appears on **Mondays, Fridays, and Saturdays**
- Lower engagement appears on **Tuesdays and Sundays**

**Business implication:**  
Campaigns, reminders, and feature prompts should be tested during high-engagement windows to maximize visibility and interaction.

---

### 2. Monthly Trend
Usage metrics increase noticeably from **March to April**.

- average distance increases
- daily steps increase
- overall activity becomes more consistent

**Business implication:**  
Bellabeat can align campaigns with seasonal momentum, especially in spring or around habit-reset moments.

---

### 3. Time-of-Day Behavior
The most intense user activity happens during the **afternoon and night**.

- afternoons show the highest step totals
- nights remain highly active and show strong calorie activity
- mornings are meaningful but clearly lower

**Business implication:**  
Notification timing and engagement nudges should prioritize afternoon and evening windows instead of generic morning delivery.

---

### 4. User Segmentation
The data reveals two broad user groups:

- **Active users** with consistently strong usage patterns
- **Inactive users** with lower average activity and potential churn risk

**Business implication:**  
Bellabeat should avoid one-size-fits-all engagement.  
Retention campaigns, challenge mechanics, and feature messaging should be segmented by activity profile.

---

## Recommendations

### Recommendation 1 — Launch time-aware engagement
Send reminders, movement prompts, or content recommendations during **afternoon and evening** usage peaks.

### Recommendation 2 — Use seasonal campaign windows
Build campaigns around **high-activity months** and moments when users are more likely to restart healthy habits.

### Recommendation 3 — Segment lifecycle marketing
Design different messaging for:
- highly engaged users
- at-risk inactive users
- users showing declining activity

### Recommendation 4 — Apply insights to Bellabeat Leaf
These insights could be especially useful for **Bellabeat Leaf**, since it blends wellness tracking with lifestyle positioning and could benefit from personalized behavior-based engagement.

---

## Visual Highlights

### Weekly Seasonality
![Device Usage by Day of Week](img/weekday_seasonality.PNG)

### Monthly Usage Trend
![Device Usage by Month](img/seasonality_monthly.jpg)

### User Activity Distribution
![User Activity Histogram](img/usage_histogram.png.jpg)

### Activity by Time of Day
![Time of Day Activity](img/steps_calories_by_time_of_day.png)

### Activity Heatmap
![Activity Heatmap by Day and Time](img/activity_heatmap_day_time.png)

---

## Repository Structure

```text
bellabeat-device-usage-analysis/
├── img/
├── README.md
├── analysis_summary.md
├── data_cleaning.md
├── data_sources.md
└── visualizations.md
```

---

## Related Documents

- `analysis_summary.md` — high-level findings and interpretation
- `data_cleaning.md` — preparation notes
- `data_sources.md` — source references
- `visualizations.md` — description of dashboard visuals

---

## Portfolio Framing

This project is best presented as a **data case study**, not as a software app.  
The strongest portfolio version of this project includes:

- a concise business problem
- tools and workflow
- 3–4 executive insights
- screenshots of the dashboard
- business recommendations
- a clean README that tells the full story

---

## Author

**Antonio Gutierrez**  
Data Analyst | SQL | Power BI | Data Storytelling
