import { Html, Head, Body, Container, Section, Text, Img, Heading, Hr } from '@react-email/components'
import * as React from 'react'

interface OrderConfirmationProps {
  customerName: string
  caseNumber: string
  serviceName: string
  totalPaid: string
}

export default function OrderConfirmation({ customerName = 'Valued Client', caseNumber = 'LRS-2026-00001', serviceName = 'Process Serving', totalPaid = '$85.00' }: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#F8F5EE', margin: '0', padding: '0', fontFamily: 'sans-serif' }}>
        <Container style={{ margin: '40px auto', backgroundColor: '#FFFFFF', borderRadius: '4px', overflow: 'hidden', border: '1px solid #E2E8F0', maxWidth: '600px' }}>
          <Section style={{ backgroundColor: '#0A1628', padding: '30px 40px', textAlign: 'center' }}>
            <Heading style={{ color: '#C9A84C', margin: '0', fontSize: '24px', fontWeight: 'bold' }}>LRS Professionals</Heading>
            <Text style={{ color: '#FFFFFF', margin: '10px 0 0', fontSize: '16px' }}>Order Confirmation</Text>
          </Section>
          
          <Section style={{ padding: '40px' }}>
            <Heading style={{ color: '#0A1628', fontSize: '20px', marginTop: '0' }}>Thank you for your order, {customerName}!</Heading>
            <Text style={{ color: '#475569', fontSize: '16px', lineHeight: '24px' }}>
              We have received your payment and securely filed your case. Our professionals will review the information provided and begin processing it shortly.
            </Text>
            
            <Section style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '4px', margin: '30px 0' }}>
              <Text style={{ color: '#0A1628', margin: '0 0 10px', fontWeight: 'bold' }}>Order Details</Text>
              <Text style={{ color: '#475569', margin: '5px 0' }}><strong>Case No:</strong> {caseNumber}</Text>
              <Text style={{ color: '#475569', margin: '5px 0' }}><strong>Service:</strong> {serviceName}</Text>
              <Text style={{ color: '#475569', margin: '5px 0' }}><strong>Amount Paid:</strong> {totalPaid}</Text>
            </Section>

            <Text style={{ color: '#475569', fontSize: '16px', lineHeight: '24px' }}>
              You can track the status of this case at any time by logging into your secure client portal.
            </Text>

            <Section style={{ textAlign: 'center', marginTop: '30px' }}>
              <a href="https://lrsservepros.com/login" style={{ backgroundColor: '#0A1628', color: '#C9A84C', padding: '14px 28px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
                View Client Portal
              </a>
            </Section>
          </Section>

          <Hr style={{ borderColor: '#E2E8F0', margin: '0' }} />
          
          <Section style={{ padding: '20px', textAlign: 'center' }}>
            <Text style={{ color: '#94A3B8', fontSize: '12px' }}>
              Left Right Serve & Sign Pros • Southern California
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
