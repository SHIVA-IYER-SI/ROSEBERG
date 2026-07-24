# Roseberg Terminal

Structural value chain maps published under Kuberpath Financials.

Roseberg Terminal traces production chains stage by stage, from raw input to end demand. Each stage carries its own analysis: what it does, who controls it, where it can fail, and how a disruption there transmits to everything downstream.

**Live:** https://shiva-iyer-si.github.io/roseberg-terminal

---

## Maps

| Code | Map | Stages | Status |
|---|---|---|---|
| AI | AI Value Chain Map | 116 across 15 sectors | Published |
| 02 | In development | - | Soon |
| 03 | In development | - | Soon |

### AI Value Chain Map

Quartz sand to deployed application. Fifteen sectors covering raw materials, wafer and lithography, logic and accelerators, memory and packaging, systems and cooling, data-centre build, power, connectivity, cloud, the software stack, models and data, applications, industry adoption, and the labour pools exposed to substitution.

Every stage includes:

- Stage profile, scope note and operator set
- Institutional analysis - demand outlook, competitive position, structural constraints
- Chokepoint assessment with a disruption simulation board
- Quantified baseline drawn from primary sources
- Key indicators with the reasoning for tracking each one
- Operating scenarios for expansion, constraint and transition
- Transmission analysis - how change at this stage reaches connected stages

A separate relationship map shows 297 cross-sector dependencies beyond the linear chain.

---

## Method

**Primary sources only.** Company filings, annual reports, exchange disclosures, regulatory documents and official statistics. Aggregators are used for verification, never cited as a source. 175 sources cited across the AI map.

**Stage-level analysis.** Every stage is written for that stage specifically. No templated commentary.

**Chokepoints are identified, not asserted.** Concentration, substitutability and recovery time are assessed against disclosed evidence, with reasoning shown.

**Scenarios are operating cases, not forecasts.** They describe how a stage behaves under expansion, constraint or transition. They are not predictions and carry no probability.

**No invented figures.** Where a number is unavailable from a primary source, the analysis states the mechanism qualitatively rather than estimating.

**Dated.** All analysis is stamped to its research date and revised on republication. Current data as of 23 July 2026.

---

## Structure

```
index.html          Landing page, map directory
ai/
  index.html        AI value chain map
  node.html         Stage analysis (?id=CODE)
  map-data.js       Map layout, sectors, chain captions
  node-data.js      Stage analysis content
  relations-data.js Cross-sector dependency edges
  *-styles.css      Styling, light and dark themes
research-manifest.json  Source register
```

Static site. No build step, no dependencies, no tracking. Open `index.html` or serve the directory.

---

## Author

**Shiva Iyer** - Independent Equity Research Analyst

Mechanical engineering background with postgraduate study in research analysis. CFA Level I cleared, Level II candidate. NISM Series XV (Research Analyst) certified.

---

## Disclaimer

This material is published for educational and informational purposes only. It is not investment advice and not a recommendation to buy or sell any security. Company names appear as industry examples, not as recommendations.

The author is NISM Series XV certified but is **not registered with SEBI as a Research Analyst**.

Readers should conduct their own research and consult a licensed adviser before making any investment decision.

---

© Kuberpath Financials. All analysis is original work.
