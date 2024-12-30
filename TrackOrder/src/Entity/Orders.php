<?php

namespace App\Entity;

use App\Repository\OrdersRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrdersRepository::class)]
class Orders
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer', unique: true)]
    private $id;

    #[ORM\Column(type: 'string')]
    private $client;

    #[ORM\Column(type: 'string', unique: true)]
    private $OrderNumber;
    
    #[ORM\Column(type: 'json')]
    private $product = [];

    #[ORM\Column(type: 'string')]
    private $status;

    

    public function getProduct(): ?array
    {
        return $this->product;
    }
    public function setProduct(array $product)
    {
        $this->product = $product;
        return $this;
    }


    public function getClient(): ?string
    {
        return $this->client;
    }
    public function setClient(string $client)
    {
        $this->client = $client;
        return $this;
    }
    

    public function getOrderNumber(): ?string
    {
        return $this->OrderNumber;
    }
    public function setOrderNumber(string $OrderNumber)
    {
        $this->OrderNumber = $OrderNumber;
        return $this;
    }
    

    public function getStatus(): ?string
    {
        return $this->status;
    }
    public function setStatus(string $status)
    {
        $this->status = $status;
        return $this;
    }
    

    public function getId(): ?int
    {
        return $this->id;
    }
    
}
