For **Rugby World Cup 2027**, the knockout **bracket is mostly fixed** by pool positions — and the **only “moving parts”** are _which_ pool’s **3rd-place** teams qualify (because only **4 of the 6** third-placed teams go through). World Rugby publishes a **permutations table** that deterministically plugs those 3rd-place teams into the Round of 16. ([Women's and Men's Rugby World Cup][1])

## 1) What’s fixed in the bracket (before a ball is kicked)

Once pools are finished, the following positions are **locked** into specific Round of 16 slots:

**Pool winners/runner-ups that always face each other**

- **E1 vs D2**
- **F1 vs B2**
- **A2 vs E2**
- **C2 vs F2**

**Pool winners that always face a “best 3rd” team**

- **A1 vs (best 3rd from C/E/F)**
- **B1 vs (best 3rd from D/E/F)**
- **C1 vs (best 3rd from A/E/F)**
- **D1 vs (best 3rd from B/E/F)**

So: **12 teams** (all winners + runner-ups) land in fixed places; the **4 “best 3rd”** teams are slotted using the official permutation table.

---

## 2) How the “best 3rd” teams are chosen (the inputs to the bracket)

After all pool matches are complete, the **6 third-place teams** (A3, B3, C3, D3, E3, F3) are **ranked** to identify the **best four**. The ranking uses standard competition tiebreakers, in order:

- **Match points**: 4 for a win, 2 for a draw, plus any bonus points.
- **Number of wins**: total wins across pool matches.
- **Points difference**: points scored minus points conceded.
- **Tries difference**: tries scored minus tries conceded.
- **Total points scored**.
- **Total tries scored**.
- **Disciplinary record**: fewer cards (better discipline) ranks higher.
- If still tied, apply the next published tournament tiebreak (e.g., rankings at a specified date). ([Women's and Men's Rugby World Cup][1])

The top four by these criteria are the “Best 3rd” qualifiers plugged into the Round of 16 via the permutations below.

---

## 3) How the “best 3rd” teams are placed into the Round of 16 (the permutations logic)

There are **15 possible combinations** of qualifying 3rd-place pools (because it’s “choose 4 pools out of 6”). For each combination, World Rugby’s permutations table tells you **exactly** which 3rd-place team plays **A1, B1, C1, D1**.

### Key anchor rules (always true)

- If **A3** qualifies → they **always** play **C1**
- **B3** qualifies → always plays **D1**
- **C3** qualifies → always plays **A1**
- **D3** qualifies → always plays **B1** ([Women's and Men's Rugby World Cup][1])

**E3 and F3** are the “flex” teams that fill whatever remaining slots are needed, based on which four pools provided the best thirds. ([Women's and Men's Rugby World Cup][1])

---

## 4) The official Round of 16 “Best 3rd” permutations table (transcribed)

Below is the exact mapping shown in World Rugby’s table (Combination of qualifying 3rds → who A1/B1/C1/D1 play):

| Best 3rd pools | A1 plays | B1 plays | C1 plays | D1 plays |
| -------------- | -------- | -------- | -------- | -------- |
| A/B/C/D        | C3       | D3       | A3       | B3       |
| A/B/C/E        | C3       | E3       | A3       | B3       |
| A/B/C/F        | C3       | F3       | A3       | B3       |
| A/B/D/E        | E3       | D3       | A3       | B3       |
| A/B/D/F        | F3       | D3       | A3       | B3       |
| A/B/E/F        | E3       | F3       | A3       | B3       |
| A/C/D/E        | C3       | D3       | A3       | E3       |
| A/C/D/F        | C3       | D3       | A3       | F3       |
| A/C/E/F        | C3       | E3       | A3       | F3       |
| A/D/E/F        | E3       | D3       | A3       | F3       |
| B/C/D/E        | C3       | D3       | E3       | B3       |
| B/C/D/F        | C3       | D3       | F3       | B3       |
| B/C/E/F        | C3       | E3       | F3       | B3       |
| B/D/E/F        | E3       | D3       | F3       | B3       |
| C/D/E/F        | C3       | D3       | E3       | F3       |

---

### Why this match-making works (anchor logic + fairness)

- **Avoids same-pool rematches early**: `A3→C1`, `B3→D1`, `C3→A1`, `D3→B1` distributes third-placed teams away from their own pool winners.
- **Balances bracket strength**: E3/F3 act as flex assignments so the four qualifiers are spread across **A1–D1** without clustering.
- **Deterministic and transparent**: Once you know which pools produced the best thirds, the table fixes all four pairings — no subjective seeding.
- **Rewards performance**: The “Best 3rd” ranking prioritizes results, scoring, and discipline to reflect overall quality.

### Practical “how you use it” in 20 seconds

1. Finish pools → know **A1–F3**.
2. Rank third-place teams → identify which **four** qualify. ([Women's and Men's Rugby World Cup][1])
3. Look up that **four-pool combination** in the table → it tells you exactly which 3rd plays **A1/B1/C1/D1**.
4. The rest of the bracket is then straightforward progression (winners advance along the fixed path).

---

### UI note: showing “Best 3rd” with a brief Why

When displaying qualifiers, add a small “Why” note beside each **Best 3rd** (A3–F3) to explain the indicator, for example:

- **Why Best 3rd**: Ranked across all pools by match points, wins, scoring and discipline. The top four enter the Round of 16 and are placed using the official permutations to avoid rematches and balance the bracket.
