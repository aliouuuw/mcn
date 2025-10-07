import { useState, useEffect } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton
} from 'react-share'

const uiText = {
  share: {
    fr: 'Partager',
    en: 'Share',
    wo: 'Jàpp'
  },
  shareOn: {
    fr: 'Partager sur',
    en: 'Share on',
    wo: 'Jàpp ci'
  },
  copyLink: {
    fr: 'Copier le lien',
    en: 'Copy link',
    wo: 'Copiyal liin'
  },
  linkCopied: {
    fr: 'Lien copié !',
    en: 'Link copied!',
    wo: 'Liin bi am na!'
  },
  downloadQR: {
    fr: 'Télécharger le QR code',
    en: 'Download QR code',
    wo: 'Téléchargé QR code bi'
  }
}

const socialPlatforms = [
  {
    name: 'facebook',
    component: FacebookShareButton,
    label: 'Facebook',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    bgColor: 'hover:bg-blue-600'
  },
  {
    name: 'twitter',
    component: TwitterShareButton,
    label: 'Twitter',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    bgColor: 'hover:bg-blue-400'
  },
  {
    name: 'whatsapp',
    component: WhatsappShareButton,
    label: 'WhatsApp',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
    bgColor: 'hover:bg-green-500'
  },
  {
    name: 'linkedin',
    component: LinkedinShareButton,
    label: 'LinkedIn',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    bgColor: 'hover:bg-blue-700'
  },
  {
    name: 'email',
    component: EmailShareButton,
    label: 'Email',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v8.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.9.732-1.636 1.636-1.636h3.819v8.273L12 7.184l6.545 4.91V3.819h3.819A1.636 1.636 0 0 1 24 5.457z" />
      </svg>
    ),
    bgColor: 'hover:bg-gray-600'
  }
]

export default function ShareComponent({ artifactId, artifactTitle, artifactUrl, currentLanguage }) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [sharingData, setSharingData] = useState(null)

  // Load sharing data from the generated JSON file
  useEffect(() => {
    const loadSharingData = async () => {
      try {
        const response = await fetch('/qr-codes/sharing-data.json')
        if (response.ok) {
          const data = await response.json()
          const artifactData = data.find(item => item.artifact_id === artifactId)
          if (artifactData) {
            setSharingData(artifactData)
          }
        }
      } catch (error) {
        console.error('Error loading sharing data:', error)
        // Fallback to basic sharing if JSON fails to load
        setSharingData({
          artifact_url: artifactUrl,
          qr_code_url: `/qr-codes/${artifactId}.png`
        })
      }
    }

    loadSharingData()
  }, [artifactId, artifactUrl])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(artifactUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${artifactId}-qr-code.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to download QR code:', err)
    }
  }

  const shareUrl = sharingData?.artifact_url || artifactUrl
  const shareTitle = `${artifactTitle} - Musée des Civilisations Noires`
  const qrCodeUrl = sharingData?.qr_code_url || `/qr-codes/${artifactId}.png`

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full border border-[#e5dbcf] bg-white/70 px-4 py-2 text-sm font-medium text-[#4a4136] transition hover:border-[#d1c1ad] hover:bg-white"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span>{uiText.share[currentLanguage]}</span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="modal-content max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="glass-panel rounded-3xl p-8 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-[#4a4136]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-[#2f241a] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {uiText.share[currentLanguage]}
                </h3>
                <p className="text-sm text-[#8b7359]" style={{ fontFamily: 'var(--font-accent)' }}>
                  {artifactTitle}
                </p>
              </div>

              {/* Social Platforms */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {socialPlatforms.map((platform) => {
                  const ShareButton = platform.component
                  return (
                    <ShareButton
                      key={platform.name}
                      url={shareUrl}
                      title={shareTitle}
                      className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-[#e5dbcf] bg-white/50 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-[#CD853F] ${platform.bgColor} transition-colors`}>
                        {platform.icon}
                      </div>
                      <span className="text-xs font-medium text-[#4a4136]" style={{ fontFamily: 'var(--font-accent)' }}>
                        {platform.label}
                      </span>
                    </ShareButton>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e5dbcf] to-transparent"></div>
                <span className="text-xs text-[#8b7359] px-2" style={{ fontFamily: 'var(--font-accent)' }}>ou</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e5dbcf] to-transparent"></div>
              </div>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border border-[#e5dbcf] bg-white/50 hover:bg-white transition-all duration-300 hover:shadow-md mb-6"
              >
                <svg className="h-5 w-5 text-[#CD853F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-[#4a4136]" style={{ fontFamily: 'var(--font-accent)' }}>
                  {copied ? uiText.linkCopied[currentLanguage] : uiText.copyLink[currentLanguage]}
                </span>
                {copied && (
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* QR Code Section */}
              {qrCodeUrl && (
                <div className="text-center">
                  <p className="text-xs text-[#8b7359] mb-4" style={{ fontFamily: 'var(--font-accent)' }}>
                    {uiText.downloadQR[currentLanguage]}
                  </p>
                  <div
                    className="inline-block p-4 rounded-2xl bg-white border border-[#e5dbcf] shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={handleDownloadQR}
                  >
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      className="w-24 h-24"
                      onError={(e) => {
                        // Fallback if QR code image doesn't exist
                        e.target.style.display = 'none'
                        e.target.parentElement.style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
