import React, { useState, useMemo } from 'react';

const connections = [
  // Available Connections
  {
    id: 'google',
    name: 'Google',
    icon: '🔍',
    status: 'Available',
    description: 'Access Gmail, Google Calendar, Drive, Contacts, Docs, and Sheets.',
    apis: ['Gmail', 'Google Calendar', 'Google Drive', 'Google Contacts', 'Google Docs', 'Google Sheets'],
    href: '/connections/google'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: '🟦',
    status: 'Available',
    description: 'Connect to Microsoft 365 services including Outlook, Teams, and OneDrive.',
    apis: ['Outlook', 'Microsoft Teams', 'OneDrive', 'SharePoint', 'Microsoft Graph'],
    href: '/connections/microsoft'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    status: 'Available',
    description: 'Access repositories, issues, pull requests, and developer workflows.',
    apis: ['Repositories', 'Issues', 'Pull Requests', 'Gists', 'Organizations'],
    href: '/connections/github'
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '💬',
    status: 'Available',
    description: 'Integrate with Slack workspaces for team communication.',
    apis: ['Messages', 'Channels', 'Users', 'Files', 'Workflows'],
    href: '/connections/slack'
  },
  {
    id: 'box',
    name: 'Box',
    icon: '📦',
    status: 'Available',
    description: 'Enterprise file management and collaboration platform.',
    apis: ['Files', 'Folders', 'Collaborations', 'Comments', 'Tasks'],
    href: '/connections/box'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    icon: '☁️',
    status: 'Available',
    description: 'Connect to Salesforce CRM for customer relationship management.',
    apis: ['Accounts', 'Contacts', 'Opportunities', 'Leads', 'Cases'],
    href: '/connections/salesforce'
  },
  {
    id: 'oidc',
    name: 'OpenID Connect (OIDC)',
    icon: '⚙️',
    status: 'Available',
    description: 'Configure any OpenID Connect-compliant identity provider.',
    apis: ['Custom APIs'],
    href: '/connections/oidc'
  },
  {
    id: 'custom',
    name: 'Custom OAuth2',
    icon: '🔗',
    status: 'Available',
    description: 'Build your own connection for any OAuth2-compliant authorization server.',
    apis: ['Custom APIs'],
    href: '/connections/custom'
  },
  
  // Coming Soon Connections
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    status: 'Coming Soon',
    description: 'Professional networking and career development platform.',
    apis: ['Profile', 'Connections', 'Posts', 'Companies'],
    href: '/connections/linkedin'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: '🐦',
    status: 'Coming Soon',
    description: 'Social media platform for real-time updates and conversations.',
    apis: ['Tweets', 'Direct Messages', 'Followers', 'Lists'],
    href: '/connections/twitter'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '👥',
    status: 'Coming Soon',
    description: 'Social networking platform for personal connections.',
    apis: ['Posts', 'Pages', 'Groups', 'Events'],
    href: '/connections/facebook'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '🎮',
    status: 'Coming Soon',
    description: 'Voice, video, and text communication platform for communities.',
    apis: ['Messages', 'Servers', 'Channels', 'Voice'],
    href: '/connections/discord'
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: '📝',
    status: 'Coming Soon',
    description: 'All-in-one workspace for notes, docs, and project management.',
    apis: ['Pages', 'Databases', 'Blocks', 'Users'],
    href: '/connections/notion'
  },
  {
    id: 'jira',
    name: 'Jira',
    icon: '🎯',
    status: 'Coming Soon',
    description: 'Project management and issue tracking for software teams.',
    apis: ['Issues', 'Projects', 'Boards', 'Sprints'],
    href: '/connections/jira'
  },
  {
    id: 'confluence',
    name: 'Confluence',
    icon: '📚',
    status: 'Coming Soon',
    description: 'Team collaboration and knowledge management platform.',
    apis: ['Pages', 'Spaces', 'Comments', 'Attachments'],
    href: '/connections/confluence'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: '📁',
    status: 'Coming Soon',
    description: 'Cloud storage and file synchronization service.',
    apis: ['Files', 'Folders', 'Sharing', 'Paper'],
    href: '/connections/dropbox'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    icon: '🧲',
    status: 'Coming Soon',
    description: 'Inbound marketing, sales, and customer service platform.',
    apis: ['Contacts', 'Companies', 'Deals', 'Tickets'],
    href: '/connections/hubspot'
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    icon: '🎧',
    status: 'Coming Soon',
    description: 'Customer service and support ticket management.',
    apis: ['Tickets', 'Users', 'Organizations', 'Articles'],
    href: '/connections/zendesk'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💳',
    status: 'Coming Soon',
    description: 'Payment processing and financial services.',
    apis: ['Payments', 'Customers', 'Subscriptions', 'Invoices'],
    href: '/connections/stripe'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: '🛒',
    status: 'Coming Soon',
    description: 'E-commerce platform for online stores.',
    apis: ['Products', 'Orders', 'Customers', 'Inventory'],
    href: '/connections/shopify'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    icon: '📊',
    status: 'Coming Soon',
    description: 'Flexible database and project management platform.',
    apis: ['Bases', 'Records', 'Tables', 'Views'],
    href: '/connections/airtable'
  },
  {
    id: 'trello',
    name: 'Trello',
    icon: '📋',
    status: 'Coming Soon',
    description: 'Visual project management with boards, lists, and cards.',
    apis: ['Boards', 'Cards', 'Lists', 'Members'],
    href: '/connections/trello'
  },
  {
    id: 'asana',
    name: 'Asana',
    icon: '✅',
    status: 'Coming Soon',
    description: 'Team collaboration and project management platform.',
    apis: ['Projects', 'Tasks', 'Teams', 'Portfolios'],
    href: '/connections/asana'
  }
];

// Simple fuzzy search function
function fuzzySearch(query, text) {
  if (!query) return true;
  
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Direct substring match
  if (textLower.includes(queryLower)) return true;
  
  // Character-by-character fuzzy matching
  let queryIndex = 0;
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++;
    }
  }
  
  return queryIndex === queryLower.length;
}

function ConnectionCard({ connection }) {
  const {
    name,
    icon,
    status,
    description,
    apis,
    href
  } = connection;

  const isAvailable = status === 'Available';

  return (
    <div style={{
      border: '1px solid var(--ifm-color-emphasis-200)',
      borderRadius: '12px',
      padding: '1.5rem',
      backgroundColor: 'var(--ifm-card-background-color)',
      transition: 'all 0.2s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {/* Status Badge */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isAvailable ? '#10b981' : '#f59e0b'
        }}></div>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: '500',
          color: isAvailable ? '#10b981' : '#f59e0b'
        }}>
          {status}
        </span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', marginRight: '6rem' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '10px',
          backgroundColor: 'var(--ifm-color-emphasis-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          border: '1px solid var(--ifm-color-emphasis-200)'
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', lineHeight: '1.2' }}>
            {name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p style={{ 
        color: 'var(--ifm-color-emphasis-700)', 
        fontSize: '0.875rem', 
        marginBottom: '1.25rem',
        flexGrow: 1,
        lineHeight: '1.5'
      }}>
        {description}
      </p>

      {/* APIs */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ifm-color-emphasis-600)' }}>
          Available APIs
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {apis.slice(0, 3).map((api, index) => (
            <span
              key={index}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '500',
                backgroundColor: 'var(--ifm-color-primary-lightest)',
                color: 'var(--ifm-color-primary-dark)',
                border: '1px solid var(--ifm-color-primary-light)'
              }}
            >
              {api}
            </span>
          ))}
          {apis.length > 3 && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '500',
              backgroundColor: 'var(--ifm-color-emphasis-200)',
              color: 'var(--ifm-color-emphasis-700)',
              border: '1px solid var(--ifm-color-emphasis-300)'
            }}>
              +{apis.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--ifm-color-emphasis-200)' }}>
        {isAvailable ? (
          <a
            href={href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--ifm-color-primary)',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid var(--ifm-color-primary)',
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--ifm-color-primary)';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'var(--ifm-color-primary)';
            }}
          >
            Learn more
            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>→</span>
          </a>
        ) : (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--ifm-color-emphasis-500)',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid var(--ifm-color-emphasis-300)',
            backgroundColor: 'var(--ifm-color-emphasis-100)'
          }}>
            Coming soon
          </div>
        )}
      </div>
    </div>
  );
}

export function SearchableConnectionList() {
  return <div>hi</div>
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConnections = useMemo(() => {
    if (!searchTerm.trim()) {
      return connections;
    }

    return connections.filter(connection => {
      return fuzzySearch(searchTerm, connection.name) || 
             fuzzySearch(searchTerm, connection.description) ||
             connection.apis.some(api => fuzzySearch(searchTerm, api));
    });
  }, [searchTerm]);

  // Sort connections: Available first, then Coming Soon
  const sortedConnections = useMemo(() => {
    return [...filteredConnections].sort((a, b) => {
      if (a.status === 'Available' && b.status === 'Coming Soon') return -1;
      if (a.status === 'Coming Soon' && b.status === 'Available') return 1;
      return a.name.localeCompare(b.name);
    });
  }, [filteredConnections]);

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 3rem',
              border: '2px solid var(--ifm-color-emphasis-300)',
              borderRadius: '12px',
              backgroundColor: 'var(--ifm-background-color)',
              color: 'var(--ifm-font-color-base)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--ifm-color-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--ifm-color-emphasis-300)'}
          />
          <span style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--ifm-color-emphasis-500)',
            fontSize: '1.25rem'
          }}>
            🔍
          </span>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{ 
          fontSize: '0.875rem', 
          color: 'var(--ifm-color-emphasis-600)', 
          margin: 0,
          fontWeight: '500'
        }}>
          {sortedConnections.length} connection{sortedConnections.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Connection Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {sortedConnections.map(connection => (
          <ConnectionCard key={connection.id} connection={connection} />
        ))}
      </div>

      {sortedConnections.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          border: '2px dashed var(--ifm-color-emphasis-300)',
          borderRadius: '12px',
          backgroundColor: 'var(--ifm-color-emphasis-50)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ 
            margin: '0 0 0.5rem 0', 
            color: 'var(--ifm-color-emphasis-800)',
            fontSize: '1.25rem'
          }}>
            No connections found
          </h3>
          <p style={{ 
            color: 'var(--ifm-color-emphasis-600)', 
            margin: 0,
            fontSize: '0.875rem'
          }}>
            Try searching for "{searchTerm}" or try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}
