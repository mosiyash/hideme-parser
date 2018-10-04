<?php

namespace Mosiyash\HidemeParser;

class HidemeParserTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var HidemeParser
     */
    protected $hidemeParser;

    protected function setUp()
    {
        parent::setUp();

        $this->hidemeParser = new HidemeParser();
    }

    public function testLoadTableData()
    {
        $htmlContent = file_get_contents(__DIR__.'/data/proxylist_page0.html');
        $data = $this->hidemeParser->loadTableData($htmlContent);

        $this->assertInternalType('array', $data);
        $this->assertCount(64, $data);

        /** @var Ip $ip */
        $ip = $data[0];
        $this->assertInstanceOf(Ip::class, $ip);
        $this->assertSame('205.201.36.227', $ip->getAddress());
        $this->assertSame(53281, $ip->getPort());
        $this->assertSame('United States', $ip->getCountry());
        $this->assertSame('Tropic', $ip->getCity());
        $this->assertSame(5100, $ip->getSpeed());
        $this->assertSame(Ip::TYPE_HTTP, $ip->getType());
        $this->assertSame(Ip::ANONIMITY_HIGH, $ip->getAnonimity());

        /** @var Ip $ip */
        $ip = $data[63];
        $this->assertInstanceOf(Ip::class, $ip);
        $this->assertSame('201.158.27.133', $ip->getAddress());
        $this->assertSame(4145, $ip->getPort());
        $this->assertSame('Brazil', $ip->getCountry());
        $this->assertSame(null, $ip->getCity());
        $this->assertSame(1400, $ip->getSpeed());
        $this->assertSame(Ip::TYPE_SOCKS4, $ip->getType());
        $this->assertSame(Ip::ANONIMITY_HIGH, $ip->getAnonimity());
    }
}
