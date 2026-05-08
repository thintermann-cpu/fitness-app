interface Props {
  title: string
  description?: string
}

export function AdminPlaceholderPage({ title, description }: Props) {
  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text)' }}>
        {title}
      </h1>
      <div
        style={{
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px',
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: '12px',
          border: '1px dashed var(--color-bg-elevated)',
        }}
      >
        <span style={{ fontSize: '40px', marginBottom: '16px' }}>🚧</span>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', fontWeight: 500, marginBottom: '6px' }}>
          Coming soon
        </p>
        <p style={{ color: 'var(--color-text-subtle)', fontSize: '13px', textAlign: 'center', maxWidth: '320px' }}>
          {description ?? `${title} wird in einer zukünftigen Version implementiert.`}
        </p>
      </div>
    </div>
  )
}
