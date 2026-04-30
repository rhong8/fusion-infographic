const CITATIONS = [
  `American Society of Civil Engineers. (2025, May 19). Largest tritium facility underway in England to advance fusion power. Civil Engineering Source. https://www.asce.org/publications-and-news/civil-engineering-source/article/2025/05/19/largest-tritium-facility-underway-to-advance-fusion-power`,
  `Bulletin of the Atomic Scientists. (2024, November). Introduction—Fusion, forever the energy of tomorrow? https://thebulletin.org/premium/2024-11/introduction-fusion-the-next-big-thing-again/`,
  `Chemistry World. (2025, June). Military demand strains metal supply chains. Royal Society of Chemistry. https://www.chemistryworld.com/news/military-demand-strains-metal-supply-chains/4021695.article`,
  `Clean Air Task Force. (2025, October). State policy options for fusion energy deployment. https://www.catf.us/resource/state-policy-options-for-fusion-energy-deployment/`,
  `Coalition for a Prosperous America. (2026, April). Fusion and the future of American power. https://prosperousamerica.org/fusion-and-the-future-of-american-power/`,
  `Congressional Research Service. (2022). Trends in active-duty military deaths from 2006 through 2021 (CRS Report IF10899). U.S. Congress. https://www.congress.gov/crs-product/IF10899`,
  `Crawford, N. C., & Lutz, C. (2023). Human cost of post-9/11 wars. Costs of War Project, Watson Institute, Brown University. https://costsofwar.watson.brown.edu/costs/human`,
  `Deloitte Insights. (2026). Iran and Middle East conflict impacts global economy. https://www.deloitte.com/us/en/insights/topics/economy/iran-middle-east-conflict-impacts-global-economy.html`,
  `Diaz, B., & Holt, M. (2025). Toward commercial fusion energy: Considerations for Congress (CRS Report No. R48866). Congressional Research Service. https://www.congress.gov/crs-product/R48866`,
  `Energy Institute. (2024). Statistical Review of World Energy (73rd ed.). https://www.energyinst.org/statistical-review/`,
  `Entler, S., Horacek, J., Dlouhy, T., & Dostal, V. (2018). Approximation of the economy of fusion energy. Energy, 152, 489-497. https://doi.org/10.1016/j.energy.2018.03.130`,
  `Fusion Industry Association. (2023). Chinese fusion energy programs are a growing competitor in the global race to fusion power. https://www.fusionindustryassociation.org/chinese-fusion-energy-programs-are-a-growing-competitor-in-the-global-race-to-fusion-power/`,
  `U.S. Government Accountability Office. (2025, January 10). Fusion energy: Additional planning would strengthen DOE's efforts to facilitate commercialization (GAO-25-107037). https://www.gao.gov/products/gao-25-107037`,
  `Holdren, J. P. (2024, April 3). Is fusion commercialization in sight? Not yet, says John Holdren. Belfer Center for Science and International Affairs, Harvard Kennedy School. https://www.belfercenter.org/publication/fusion-commercialization-sight-not-yet-says-john-holdren`,
  `Institute on Global Conflict and Cooperation, UC San Diego. (2025, May). Fusion and China's quest for energy independence. https://ucigcc.org/blog/fusion-and-chinas-quest-for-energy-independence/`,
  `Kilian, L., Plante, M. D., Richter, A., & Zhou, X. (2026). The impact of the 2026 Iran War on U.S. inflation (Working Paper No. 2609). Federal Reserve Bank of Dallas. https://www.dallasfed.org/~/media/documents/research/papers/2026/wp2609.pdf`,
  `Kleinman Center for Energy Policy, University of Pennsylvania. (2025, October 28). Bringing fusion energy to the grid: Challenges and pathways. https://kleinmanenergy.upenn.edu/research/publications/bringing-fusion-energy-to-the-grid-challenges-and-pathways/`,
  `Kuiken, T., Holt, M., & Offutt, M. C. (2024). ITER—An international nuclear fusion research and development facility (CRS Report No. R48362). Congressional Research Service, U.S. Congress.`,
  `Lancet Countdown. (2025). 2025 Lancet Countdown on health and climate change. https://phys.org/news/2025-11-climate-inaction-millions-year.html`,
  `Lelieveld, J., Pozzer, A., Poschl, U., Fnais, M., Haines, A., & Munzel, T. (2023). Air pollution deaths attributable to fossil fuels: Observational and modelling study. BMJ, 383, e077784. https://doi.org/10.1136/bmj-2023-077784`,
  `Loy, T. (2024, November). Fusion energy leadership through tritium production capacity. Federation of American Scientists. https://fas.org/publication/fusion-energy-leadership-tritium-capacity/`,
  `MIT Energy Initiative. (2025, December 8). Funding the fusion revolution. https://energy.mit.edu/news/funding-the-fusion-revolution/`,
  `Special Competitive Studies Project. (2025, February 24). Fusion power: Enabling 21st century American dominance. https://www.scsp.ai/wp-content/uploads/2025/02/Final-Fusion-Power_-Enabling-21st-Century-American-Dominance.pdf`,
  `Takeda, S., Keeley, A. R., & Managi, S. (2023). How many years away is fusion energy? A review. Journal of Fusion Energy, 42, 16. https://doi.org/10.1007/s10894-023-00361-z`,
  `Vohra, K., Vodonos, A., Schwartz, J., Marais, E. A., Sulprizio, M. P., & Mickley, L. J. (2021). Global mortality from outdoor fine particle pollution generated by fossil fuel combustion: Results from GEOS-Chem. Environmental Research, 195, 110754. https://doi.org/10.1016/j.envres.2021.110754`,
]

export default function WorksCited({ onNavigate }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 24px 80px',
    }}>
      <button
        onClick={() => onNavigate('hero')}
        style={{
          alignSelf: 'flex-start',
          marginBottom: 40,
          background: 'none',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#aaa',
          padding: '7px 16px',
          borderRadius: 7,
          cursor: 'pointer',
          fontSize: 13,
        }}
      >
        ← Back
      </button>

      <h1 style={{
        fontSize: 28,
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 48,
        letterSpacing: 1,
      }}>
        Works Cited
      </h1>

      <ol style={{
        maxWidth: 760,
        width: '100%',
        listStyle: 'decimal',
        paddingLeft: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        {CITATIONS.map((cite, i) => (
          <li key={i} style={{
            fontSize: 14,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.82)',
            wordBreak: 'break-word',
          }}>
            {cite}
          </li>
        ))}
      </ol>
    </div>
  )
}
