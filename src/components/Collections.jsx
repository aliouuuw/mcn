const artifacts = [
  {
    type: "image",
    src: "/artifacts/artifact-1.jpg",
    titles: {
      fr: "Masque Traditionnel",
      en: "Traditional Mask",
    },
    descriptions: {
      fr: "Masque Traditionnel",
      en: "Traditional Mask",
    },
    audios: {
      fr: null,
      en: null,
      wo: null,
    },
  },
  {
    type: "image",
    src: "/artifacts/artifact-2.jpg",
    titles: {
      fr: "Textile Kente",
      en: "Kente Textile",
    },
    descriptions: {
      fr: "Textile Kente",
      en: "Kente Textile",
    },
    audios: {
      fr: null,
      en: null,
      wo: null,
    },
  },
  {
    type: "image",
    src: "/artifacts/artifact-3.jpg",
    titles: {
      fr: "Sculpture Ancienne",
      en: "Ancient Sculpture",
      wo: "Sculpture Ancienne",
    },
    descriptions: {
      fr: "Sculpture Ancienne",
      en: "Ancient Sculpture",
      wo: "Sculpture Ancienne",
    },
    audios: {
      fr: null,
      en: null,
      wo: null,
    },
  },
  {
    id: 5,
    type: "image",
    src: "/artifacts/artifact-4.jpg",
    title: "Masque Cerémonial",
    period: "XVIIe siècle",
    culture: "Culture Senufo",
    row: 1,
    col: 1.5,
    span: 1.5, // Spans 1.5 columns
  },
  {
    type: "video",
    src: "/artifacts/video-placeholder.png",
    thumbnail: "/artifacts/video-placeholder.png",
    titles: {
      fr: "Rituel Funéraire",
      en: "Funeral Ritual",
    },
    descriptions: {
      fr: "Rituel Funéraire",
      en: "Funeral Ritual",
    },
    audios: {
      fr: null,
      en: null,
      wo: null,
    },
  },
];


// Irregular grid item component with random heights
function GridItem({ artifact, span = 1, height = 'h-64' }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{
        gridColumn: `span ${span}`,
      }}
    >
      <div className={`${height} relative`}>
        <img
          src={artifact.type === 'video' ? artifact.thumbnail : artifact.src}
          alt={artifact.titles?.en || artifact.title || 'Artifact'}
          className="w-full h-full object-contain bg-transparent"
        />
        
        {/* Video indicator */}
        {artifact.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main Collections component - Highly irregular grid with chaotic layouts
const Collections = () => {
  // Define extremely irregular grid layout patterns with random spans and heights
  const gridLayouts = [
    // Row 1: Asymmetric start with large items
    [1.5, null, 3, null, 2.5],
    // Row 2: Single massive item offset
    [null, 4, null],
    // Row 3: Scattered medium items with gaps
    [2, null, null, 1.5, null, 2.5],
    // Row 4: Chaotic mix of larger sizes
    [2.5, 1.5, null, 3, null],
    // Row 5: Off-center large item
    [null, 3.5, null, 2.5],
    // Row 6: Dense irregular pattern
    [1.5, 2, null, 2.5, null, 2]
  ]

  // Create highly irregular grid positions with random heights
  const gridPositions = []
  let artifactIndex = 0
  
  // Large height classes from regular to extra-large
  const randomHeights = [
    'h-64', 'h-72', 'h-80', 'h-96', 'h-[28rem]', 'h-[32rem]', 'h-[36rem]', 'h-[40rem]'
  ]

  gridLayouts.forEach((row) => {
    row.forEach((span) => {
      if (span === null) {
        // Empty cell
        gridPositions.push(null)
      } else {
        // Filled cell with artifact and random height
        gridPositions.push({
          artifact: artifacts[artifactIndex % artifacts.length],
          span: span,
          height: randomHeights[Math.floor(Math.random() * randomHeights.length)]
        })
        artifactIndex++
      }
    })
  })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-8 gap-2 md:gap-4 lg:gap-6">
          {gridPositions.map((position, index) => {
            if (position === null) {
              // Render empty cell
              return (
                <div
                  key={index}
                  className="h-32"
                  style={{ gridColumn: 'span 1' }}
                />
              )
            } else {
              // Render GridItem
              return (
                <GridItem
                  key={index}
                  artifact={position.artifact}
                  span={position.span}
                  height={position.height}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Collections
